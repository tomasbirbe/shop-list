'use client'

import { AlertDialogHeader, AlertDialogFooter } from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { AlertDialog, AlertDialogTrigger, AlertDialogContent, AlertDialogTitle, AlertDialogDescription, AlertDialogCancel, AlertDialogAction } from "@/components/ui/alert-dialog";
import { useEffect, useState } from "react";
import {z} from 'zod'
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"

type Product = {
	name: string;
	price: number;
	amount: number;
}


const numberSchema = z.coerce.number()
const formatter = new Intl.NumberFormat('es-AR', { style: 'currency', currency	: 'ARS', minimumFractionDigits:0})

export default function Home() {
	const [products, setProducts] = useState<Array<Product>>(() => JSON.parse(localStorage.getItem('cart') || '[]') )
	const [IsModalOpen, setIsModalOpen] = useState(false)
	const formSchema = z.object({
		name: z.string().trim().toLowerCase().min(1, {message: 'Debe definir un nombre para el producto'}).refine((val) => !products.some((product) => product.name === val), {message: 'Nombre duplicado'}),
		price: z.coerce.number({invalid_type_error: 'Debe ingresar un numero'}).positive({message: 'El valor debe ser positivo'}),
		amount: z.coerce.number().int({message: 'El valor debe ser un numero entero'}).positive({ message: 'El valor debe ser positivo'}).optional().or(z.string().max(0))
	})

	const form = useForm<z.infer<typeof formSchema>>({
		resolver: zodResolver(formSchema),
		defaultValues: {
			name: '',
			//@ts-ignore because it show a useless error
			price: '',
			//@ts-ignore because it show a useless error
			amount: '',	
		}
  })

	useEffect(() => {
		form.reset()
	},[IsModalOpen,form])

	

	function addProduct(values: z.infer<typeof formSchema>) {
		const { name, price, amount } = values
		
		const newProduct = { name, price, amount: Number(amount) || 1 }
		setProducts((products) => [...products, newProduct])
		localStorage.setItem('cart',JSON.stringify([...products, newProduct]))
		setIsModalOpen(false)
		
	}

	function toggleModal() {
		setIsModalOpen((isModalOpen) => !isModalOpen)
	}

	function removeProduct(productToRemove: Product['name']) {
		const updateProducts = products.filter((product) => product.name !== productToRemove)
		setProducts(updateProducts)
		localStorage.setItem('cart', JSON.stringify(updateProducts))
	}

	function calculateTotal() {
		const total = products.reduce((acum, product) => {
			return acum + (product.price * product.amount)
		}, 0)
		return formatter.format(total)
	}

	return (
		<main className="w-[800px] min-h-screen mx-auto grid grid-rows-[1fr_auto] justify-items-center pt-4">
			{
				products.length > 0 ?
					<ul className="w-full flex flex-col gap-4">
						{products.map((product) => <li key={product.name} className="capitalize bg-[whitesmoke] rounded-[6px] py-6 px-4 flex justify-between">
							<div>
								<p>{product.name}</p>
								<p className="opacity-70">{formatter.format(product.price)} - {product.amount}</p>
							</div>
							<div>
								<AlertDialog>
							<AlertDialogTrigger asChild>
								<Button variant="outline" className="bg-[whitesmoke]">X</Button>
							</AlertDialogTrigger>
							<AlertDialogContent className="w-[350px]">
								<AlertDialogHeader>
									<AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
									<AlertDialogDescription>
										Esta accion no se puede deshacer. Vas a eliminar este producto de la lista?
									</AlertDialogDescription>
								</AlertDialogHeader>
								<AlertDialogFooter>
									<AlertDialogCancel>Cancelar</AlertDialogCancel>
									<AlertDialogAction onClick={() => removeProduct(product.name)}>Continuar</AlertDialogAction>
								</AlertDialogFooter>
							</AlertDialogContent>
						</AlertDialog>
							</div>
						</li>)}
					</ul>
					: <h1 className="py-52 opacity-50">Esta lista esta vacia 🙈</h1>
			}
			<div className="w-full flex justify-between items-center flex-cols py-4 bg-[whitesmoke] px-8 rounded-[6px]">
				<p>Total</p>
				<Dialog open={IsModalOpen} onOpenChange={toggleModal}>
					<DialogTrigger className="w-[40px] h-[40px]">+</DialogTrigger>
					<DialogContent className="w-[300px]">
						<DialogHeader>
							<DialogTitle>Agregar producto</DialogTitle>
						</DialogHeader>
							<Form {...form}>
									<form onSubmit={form.handleSubmit(addProduct)} className="flex flex-col gap-4">
										<FormField
											control={form.control}
											name="name"
											render={({ field }) => (
												<FormItem>
													<FormLabel>Nombre del producto</FormLabel>
													<FormControl>
														<Input {...field} />
													</FormControl>
													<FormMessage className="text-[14px]"/>
												</FormItem>
											)}
										/>
										<FormField
											control={form.control}
											name="price"
											render={({ field }) => (
												<FormItem>
													<FormLabel>Precio del producto</FormLabel>
													<FormControl>
														<Input {...field} type="number" step={'0.01'} />
													</FormControl>
													<FormMessage />
												</FormItem>
											)}
										/>
										<FormField
											control={form.control}
											name="amount"
											render={({ field }) => (
												<FormItem>
													<FormLabel>Cantidad del producto</FormLabel>
													<FormControl>
														<Input {...field} type="number" />
													</FormControl>
													<FormMessage />
												</FormItem>
											)}
										/>
									<Button className="w-full" type="submit">Guardar</Button>
									</form>
								</Form>
						<DialogFooter>
						</DialogFooter>
					</DialogContent>
				</Dialog>

				<p>{calculateTotal()}</p>
			</div>



		</main>
	);
}
