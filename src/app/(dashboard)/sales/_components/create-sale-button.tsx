import { Button } from "@/app/_components/ui/button";
import { Sheet, SheetTrigger } from "@/app/_components/ui/sheet";
import { PlusIcon } from "lucide-react";

import { getProducts } from "@/app/_data/products/get-products";
import SalesForm from "./Form";

const CreateSaleButton = async () => {
  const products = await getProducts();
  const productOptions = products.map((product) => ({
    value: product.id,
    label: product.name,
  }));

  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button className="gap-2">
          <PlusIcon size={20} />
          Nova venda
        </Button>
      </SheetTrigger>
      <SalesForm products={products} productOption={productOptions} />
    </Sheet>
  );
};

export default CreateSaleButton;
