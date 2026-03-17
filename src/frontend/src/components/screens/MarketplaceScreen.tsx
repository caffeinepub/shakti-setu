import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Plus, ShoppingCart, Star, X } from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import { useState } from "react";
import { useProducts } from "../../hooks/useQueries";

const sampleProducts = [
  {
    id: "p1",
    title: "Handmade Jhola Bag",
    price: 450,
    category: "Handicrafts",
    seller: "Sunita Devi",
    image: "/assets/generated/product-handicraft.dim_200x200.png",
    rating: 4.8,
    description:
      "Beautiful handcrafted jhola bag made with natural cotton fabric. Eco-friendly and stylish.",
  },
  {
    id: "p2",
    title: "Homemade Mango Pickle",
    price: 180,
    category: "Food",
    seller: "Rekha Ben",
    image: "/assets/generated/product-food.dim_200x200.png",
    rating: 4.9,
    description:
      "Traditional family recipe mango pickle made with pure mustard oil and Indian spices.",
  },
  {
    id: "p3",
    title: "Embroidered Dupatta",
    price: 650,
    category: "Clothing",
    seller: "Meena Kumari",
    image: "/assets/generated/product-handicraft.dim_200x200.png",
    rating: 4.7,
    description:
      "Gorgeous hand-embroidered dupatta with intricate mirror work from Rajasthan.",
  },
  {
    id: "p4",
    title: "Herbal Face Pack",
    price: 120,
    category: "Beauty",
    seller: "Anita Sharma",
    image: "/assets/generated/product-food.dim_200x200.png",
    rating: 4.6,
    description:
      "100% natural herbal face pack with turmeric, sandalwood, and rose water.",
  },
  {
    id: "p5",
    title: "Handwoven Basket",
    price: 320,
    category: "Handicrafts",
    seller: "Lakshmi Bai",
    image: "/assets/generated/product-handicraft.dim_200x200.png",
    rating: 4.8,
    description:
      "Traditional handwoven bamboo basket, perfect for storage and decoration.",
  },
  {
    id: "p6",
    title: "Mixed Spice Kit",
    price: 240,
    category: "Food",
    seller: "Savita Devi",
    image: "/assets/generated/product-food.dim_200x200.png",
    rating: 4.9,
    description:
      "Handpicked and freshly ground authentic Indian spice blends for your kitchen.",
  },
];

const categories = ["All", "Handicrafts", "Food", "Clothing", "Beauty"];

type Product = (typeof sampleProducts)[0];

export default function MarketplaceScreen() {
  const [activeCategory, setActiveCategory] = useState("All");
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const { data: backendProducts } = useProducts();

  const products =
    backendProducts && backendProducts.length > 0
      ? backendProducts.map((p) => ({
          id: p.id,
          title: p.title,
          price: Number(p.price),
          category: p.category,
          seller: "Shakti Seller",
          image: "/assets/generated/product-handicraft.dim_200x200.png",
          rating: 4.7,
          description: p.description,
        }))
      : sampleProducts;

  const filtered =
    activeCategory === "All"
      ? products
      : products.filter((p) => p.category === activeCategory);

  return (
    <div className="flex flex-col relative">
      <div className="shakti-gradient px-5 pt-safe pb-5">
        <div className="pt-4">
          <h1 className="text-white text-xl font-bold">Bazaar 🛍️</h1>
          <p className="text-white/80 text-sm mt-1">
            Buy & sell handmade products
          </p>
        </div>
      </div>

      <div className="px-4 py-4">
        <div className="flex gap-2 overflow-x-auto pb-2 hide-scrollbar mb-4">
          {categories.map((cat) => (
            <button
              type="button"
              key={cat}
              data-ocid={`market.${cat.toLowerCase()}.tab`}
              onClick={() => setActiveCategory(cat)}
              className={`flex-none px-4 py-1.5 rounded-full text-sm font-semibold transition-all border ${
                activeCategory === cat
                  ? "bg-primary text-white border-primary"
                  : "bg-card text-muted-foreground border-border hover:border-primary/40"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        <div className="grid grid-cols-2 gap-3">
          {filtered.map((product, i) => (
            <motion.div
              key={product.id}
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.04 * i }}
              data-ocid={`market.product.item.${i + 1}`}
            >
              <Card
                className="border-0 shakti-card-shadow overflow-hidden cursor-pointer"
                onClick={() => setSelectedProduct(product)}
              >
                <div className="aspect-square overflow-hidden bg-muted">
                  <img
                    src={product.image}
                    alt={product.title}
                    className="w-full h-full object-cover"
                  />
                </div>
                <CardContent className="p-3">
                  <p className="text-xs font-bold text-foreground leading-tight truncate">
                    {product.title}
                  </p>
                  <p className="text-xs text-muted-foreground truncate">
                    {product.seller}
                  </p>
                  <div className="flex items-center justify-between mt-1.5">
                    <p className="text-sm font-black text-primary">
                      ₹{product.price}
                    </p>
                    <span className="flex items-center gap-0.5 text-xs text-muted-foreground">
                      <Star className="w-3 h-3 text-yellow-500" />
                      {product.rating}
                    </span>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>

      <motion.button
        type="button"
        data-ocid="market.sell.open_modal_button"
        className="fixed bottom-24 right-4 w-14 h-14 orange-gradient rounded-full shadow-lg flex items-center justify-center text-white z-40"
        whileTap={{ scale: 0.92 }}
        whileHover={{ scale: 1.05 }}
      >
        <Plus className="w-6 h-6" />
      </motion.button>

      <AnimatePresence>
        {selectedProduct && (
          <Dialog
            open={!!selectedProduct}
            onOpenChange={() => setSelectedProduct(null)}
          >
            <DialogContent
              className="max-w-[360px] rounded-3xl p-0 overflow-hidden border-0"
              data-ocid="market.product.dialog"
            >
              <div className="relative">
                <img
                  src={selectedProduct.image}
                  alt={selectedProduct.title}
                  className="w-full h-52 object-cover"
                />
                <button
                  type="button"
                  data-ocid="market.product.close_button"
                  onClick={() => setSelectedProduct(null)}
                  className="absolute top-3 right-3 w-8 h-8 bg-black/40 rounded-full flex items-center justify-center text-white"
                >
                  <X className="w-4 h-4" />
                </button>
                <span className="absolute bottom-3 left-3 bg-primary text-white text-xs px-3 py-1 rounded-full font-semibold">
                  {selectedProduct.category}
                </span>
              </div>
              <DialogHeader className="px-5 pt-4 pb-1">
                <DialogTitle className="text-base font-bold text-left">
                  {selectedProduct.title}
                </DialogTitle>
              </DialogHeader>
              <div className="px-5 pb-5">
                <p className="text-sm text-muted-foreground">
                  {selectedProduct.description}
                </p>
                <div className="flex items-center gap-2 mt-3">
                  <div className="w-7 h-7 rounded-full bg-primary/20 flex items-center justify-center text-sm">
                    👩
                  </div>
                  <span className="text-xs font-semibold text-foreground">
                    {selectedProduct.seller}
                  </span>
                  <span className="flex items-center gap-0.5 text-xs ml-auto">
                    <Star className="w-3 h-3 text-yellow-500" />
                    {selectedProduct.rating}
                  </span>
                </div>
                <div className="flex items-center gap-3 mt-4">
                  <span className="text-2xl font-black text-primary">
                    ₹{selectedProduct.price}
                  </span>
                  <Button
                    className="flex-1 h-11 rounded-2xl bg-accent text-white font-bold hover:bg-accent/90"
                    data-ocid="market.product.primary_button"
                  >
                    <ShoppingCart className="w-4 h-4 mr-2" /> Add to Cart
                  </Button>
                </div>
              </div>
            </DialogContent>
          </Dialog>
        )}
      </AnimatePresence>
    </div>
  );
}
