'use client'

import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useState } from "react";

type Product = {
	name: string;
	price: number;
	amount: number;
}

const formatter = new Intl.NumberFormat('es-AR', { style: 'currency', currency	: 'ARS', minimumFractionDigits:0})

export default function Home() {
	const [products, setProducts] = useState<Array<Product>>([])
	const [IsModalOpen, setIsModalOpen] = useState(false)

	function addProduct(event: React.FormEvent<HTMLFormElement>) {
		event.preventDefault()
		const form = event.currentTarget

		const formData = new FormData(form)

		const { name, price, amount } = {
			name: formData.get('name')?.toString().trim().toLocaleLowerCase(),
			price: formData.get('price')?.toString().trim().toLocaleLowerCase(),
			amount: formData.get('amount')?.toString().trim().toLocaleLowerCase(),
		}


		if (name && price) {
			const exists = products.some((product) => product.name === name)
			if (!exists) {
				setProducts((products) => [...products, { name, price: Number(price), amount: Number(amount || 1) }])
				setIsModalOpen(false)
			}
		}

	}

	function toggleModal() {
		setIsModalOpen((isModalOpen) => !isModalOpen)
	}

	function removeProduct(productToRemove: Product['name']) {
		setProducts((products) => products.filter((product) => product.name !== productToRemove))
	}

	function calculateTotal() {
		const total = products.reduce((acum, product) => {
			return acum + (product.price * product.amount)
		}, 0)
		console.log(total)
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
								<Button variant='ghost' onClick={() => removeProduct(product.name)}>X</Button>
							</div>
						</li>)}
					</ul>
					: <h1 className="py-52 opacity-50">Esta lista esta vacia 🙈</h1>
			}
			<div className="w-full flex justify-between items-center flex-cols py-4 bg-[whitesmoke] px-4 rounded-[6px]">
				<p>Total</p>
				<Dialog open={IsModalOpen} onOpenChange={toggleModal}>
					<DialogTrigger className="w-[40px] h-[40px]">+</DialogTrigger>
					<DialogContent className="w-[300px]">
						<DialogHeader>
							<DialogTitle>Agregar producto</DialogTitle>
						</DialogHeader>
						<form className="flex flex-col gap-4" id="add-product" onSubmit={addProduct}>
							<div className="flex flex-col gap-2">
								<Label htmlFor="name">Nombre del producto</Label>
								<Input id="name" name="name" required />
							</div>
							<div className="flex flex-col gap-2">
								<Label htmlFor="price">Precio del producto</Label>
								<Input name="price" id="price" type="number" step={'0.01'} required />
							</div>
							<div className="flex flex-col gap-2">
								<Label htmlFor="amount">Cantidad del producto</Label>
								<Input id='amount' name='amount' type="number" />
							</div>
						</form>
						<DialogFooter>
							<Button className="w-full" type="submit" form="add-product">Guardar</Button>
						</DialogFooter>
					</DialogContent>
				</Dialog>

				<p>{calculateTotal()}</p>
			</div>



		</main>
	);
}
