import { Button } from "@mui/material";
import { Product } from "../../app/models/product";
import ProductList from "./ProductList";
import { useState, useEffect } from "react";
import agent from "../../app/api/agent";
import LoadingComponent from "../../app/layout/LoadingComponent";
import { error } from "console";

export default function Catalog(){
    const [products,setProducts]=useState<Product[]>([
    ])
    const [loading, setLoading] = useState(true);
    useEffect(()=>{
        agent.Catalog.list()
        .then(products=> setProducts(products))
        .catch(error=> console.log(error))
        .finally(()=> setLoading(false))
        },[])
        if (loading) return <LoadingComponent message="Loading Products..."/>
return (
    <>
    <ProductList products={products}/>
    <Button variant="contained">Add Product</Button>
    </>
)
}