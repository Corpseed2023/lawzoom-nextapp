'use server'
export async function getProductData(){
    const res= await fetch('https://dummyjson.com/products')
    const data= await res.json()
    return data
}