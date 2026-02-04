"use client"; // Client component needed for Framer Motion
import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { ArrowRight, Leaf, Heart, RefreshCcw, Plus } from 'lucide-react';
import { motion } from "framer-motion";

// Helper Component for This Week's Picks
const PicksItem = ({ img, brand, name, price, aspect, isPlaceholder }) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true }}
    className="group cursor-pointer"
  >
    <div className={`relative w-full ${aspect} overflow-hidden bg-[#EADCD6] mb-8`}>
      <Image
        src={img}
        alt={name}
        fill
        className={`object-cover transition-transform duration-700 ease-in-out group-hover:scale-110 ${isPlaceholder ? 'opacity-20 grayscale' : ''}`}
      />
      <div className="absolute bottom-6 right-6 w-10 h-10 flex items-center justify-center bg-white text-[#2D2D2D] rounded-full shadow-md opacity-0 group-hover:opacity-100 transition-opacity duration-300">
        <Plus className="w-5 h-5" />
      </div>
    </div>
    <div className="px-1">
      <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-[#8D7B68] mb-3">{brand}</p>
      <div className="flex justify-between items-start gap-4">
        <h4 className="text-xl font-serif text-[#2D2D2D] leading-tight group-hover:text-[#8D7B68] transition-colors">{name}</h4>
        <span className="text-sm font-sans font-medium text-[#2D2D2D] whitespace-nowrap mt-1">{price}</span>
      </div>
    </div>
  </motion.div>
);

export default function Home() {
  const features = [
    {
      icon: <Leaf className="w-8 h-8 text-gray-500 mb-4" strokeWidth={1} />,
      title: "Sustainable Materials",
      text: "We use 100% organic cotton, linen, and recycled fibers that are gentle on the earth."
    },
    {
      icon: <Heart className="w-8 h-8 text-gray-500 mb-4" strokeWidth={1} />,
      title: "Ethical Production",
      text: "Fair wages, safe working conditions, and respect for the artisans who craft our pieces."
    },
    {
      icon: <RefreshCcw className="w-8 h-8 text-gray-500 mb-4" strokeWidth={1} />,
      title: "Circular Design",
      text: "Designed for longevity and recyclability. Send back your old pieces for credit."
    }
  ];

  const newArrivals = [
    { id: 1, name: "Organic Basic Tee", img: "/girl2.jpeg", price: "$45" },
    { id: 2, name: "Linen Wide Leg Pant", img: "/girl3.jpg", price: "$120" },
    { id: 3, name: "Recycled Wool Blazer", img: "/girl4.jpg", price: "$250" },
    { id: 4, name: "Handmade Knit Sweater", img: "/girl5.jpg", price: "$180" },
  ];

  const picks = [
    { id: 101, name: "Re-Nylon Gabardine Dress", img: "/girl3.jpg", price: "$2450", span: "row-span-2" },
    { id: 102, name: "Half Moon Leather Bag", img: "/girl4.jpg", price: "$1290", span: "" },
    { id: 103, name: "Opyum 110 Pumps", img: "/girl2.jpeg", price: "$995", span: "" },
    { id: 104, name: "Cassette Bag", img: "/girl5.jpg", price: "$3200", span: "row-span-2" },
  ];

  // Animation Variants
  const fadeInUp = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: "easeOut" } }
  };

  const staggerContainer = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2
      }
    }
  };

  return (
    <div className="bg-[var(--background)] min-h-screen overflow-x-hidden">

      {/* Hero Section */}
      <section className="relative pt-20 pb-20 lg:pt-32 lg:pb-40 overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">

            {/* Text Content */}
            <motion.div
              initial="hidden"
              animate="visible"
              variants={staggerContainer}
              className="z-10 relative"
            >
              <motion.p variants={fadeInUp} className="text-[#8D7B68] uppercase tracking-[0.2em] text-sm font-bold mb-6">
                Consciously Crafted
              </motion.p>
              <motion.h1 variants={fadeInUp} className="text-6xl md:text-8xl lg:text-9xl font-serif text-[#2D2D2D] leading-[0.85] mb-8 tracking-tighter">
                Fash<br />ion<br />Feels<br />Good
              </motion.h1>
              <motion.div variants={fadeInUp} className="h-px w-24 bg-[#8D7B68] mb-10" />
              <motion.p variants={fadeInUp} className="text-gray-600 text-lg max-w-md mb-12 leading-relaxed font-sans">
                Sustainable essentials made from organic materials. Designed for the modern wardrobe, crafted for a better future.
              </motion.p>
              <motion.div variants={fadeInUp} className="flex flex-col sm:flex-row gap-5">
                <Link href="/shop" className="group inline-flex items-center justify-center bg-[#2D2D2D] text-white px-10 py-4 text-sm uppercase tracking-widest hover:bg-[#8D7B68] transition-colors duration-300">
                  Shop Collection <ArrowRight className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </Link>
                <Link href="/about" className="inline-flex items-center justify-center text-[#2D2D2D] px-10 py-4 text-sm uppercase tracking-widest border border-[#2D2D2D] hover:bg-[#2D2D2D] hover:text-white transition-all duration-300">
                  Our Story
                </Link>
              </motion.div>
            </motion.div>

            {/* Hero Image - Arch Shape */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 1.2, ease: "easeOut" }}
              className="relative h-[700px] w-full hidden lg:block"
            >
              {/* Decorative Circle */}
              <div className="absolute top-10 right-[-20px] w-64 h-64 bg-[#EADCD6] rounded-full mix-blend-multiply opacity-50 blur-3xl" />

              <div className="absolute top-0 right-0 w-[90%] h-full rounded-t-[20rem] overflow-hidden shadow-2xl">
                <Image
                  src="/girl3.AVIF"
                  alt="Sustainable Fashion"
                  fill
                  className="object-cover object-top hover:scale-105 transition-transform duration-[2s]"
                  priority
                />
              </div>
            </motion.div>

          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-24 bg-[#F9EFEC]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={staggerContainer}
            className="grid grid-cols-1 md:grid-cols-3 gap-16 text-center"
          >
            {features.map((feature, idx) => (
              <motion.div variants={fadeInUp} key={idx} className="flex flex-col items-center max-w-xs mx-auto group">
                <div className="w-24 h-24 rounded-full border-[1.5px] border-[#DBC8C0] flex items-center justify-center mb-8 group-hover:border-[#8D7B68] group-hover:scale-110 transition-all duration-300 bg-white/50 backdrop-blur-sm">
                  {React.cloneElement(feature.icon, { className: "w-8 h-8 text-[#4A4A4A] group-hover:text-[#8D7B68] transition-colors" })}
                </div>
                <h3 className="text-xl font-serif text-[#2D2D2D] mb-4">{feature.title}</h3>
                <p className="text-gray-600 font-sans text-sm leading-7">{feature.text}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* New Arrivals */}
      <section className="py-48">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="flex flex-col md:flex-row justify-between items-end mb-16 border-b border-[#DBC8C0] pb-6"
          >
            <div>
              <h2 className="text-4xl md:text-5xl font-serif text-[#2D2D2D] mb-3">New Arrivals</h2>
              <p className="text-gray-500 font-sans text-lg">Timeless pieces crafted for the season of renewal.</p>
            </div>
            <Link href="/shop" className="text-sm font-bold uppercase tracking-widest text-[#2D2D2D] hover:text-[#8D7B68] transition-colors mt-6 md:mt-0 flex items-center group">
              View All Products <ArrowRight className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </Link>
          </motion.div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-16">
            {newArrivals.map((product, idx) => (
              <motion.div
                key={product.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: idx * 0.1 }}
                className="group cursor-pointer max-w-sm mx-auto w-full"
              >
                <div className="relative w-full aspect-[3/4] overflow-hidden bg-[#EADCD6] mb-6">
                  <Image
                    src={product.img}
                    alt={product.name}
                    fill
                    className="object-cover group-hover:scale-110 transition-transform duration-700 ease-in-out"
                  />
                  <div className="absolute inset-x-0 bottom-0 p-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <button className="w-full bg-white text-[#2D2D2D] py-4 text-xs font-bold uppercase tracking-widest hover:bg-[#2D2D2D] hover:text-white transition-colors flex items-center justify-center gap-2 shadow-lg">
                      <Plus className="w-3 h-3" /> Quick Add
                    </button>
                  </div>
                  <div className="absolute top-4 left-4">
                    {product.id === 1 && <span className="text-[10px] font-bold uppercase tracking-widest text-white bg-black/20 backdrop-blur-md px-3 py-1">Organic</span>}
                    {product.id === 3 && <span className="text-[10px] font-bold uppercase tracking-widest text-white bg-black/20 backdrop-blur-md px-3 py-1">Recycled</span>}
                  </div>
                </div>
                <h3 className="text-lg font-serif text-[#2D2D2D] mb-1 group-hover:text-[#8D7B68] transition-colors">{product.name}</h3>
                <p className="text-sm font-medium text-gray-500">{product.price}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Week's Picks (Asymmetrical Masonry) */}
      <section className="py-48 bg-transparent">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="flex flex-col md:flex-row justify-between items-end mb-24"
          >
            <div>
              <span className="text-[#8D7B68] font-bold uppercase tracking-[0.3em] text-[10px] mb-3 block">Curated</span>
              <h2 className="text-5xl md:text-6xl font-serif text-[#2D2D2D] tracking-tight">This Week's Picks</h2>
            </div>
            <Link href="/shop" className="text-[10px] font-bold uppercase tracking-[0.2em] text-[#2D2D2D] border-b border-[#2D2D2D] pb-1 hover:text-[#8D7B68] hover:border-[#8D7B68] transition-colors mb-2">
              View All
            </Link>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-12 lg:gap-20">
            {/* Column 1 */}
            <div className="flex flex-col gap-24">
              <PicksItem
                img="/girl3.jpg"
                brand="Prada"
                name="Re-Nylon Gabardine Dress"
                price="$2450"
                aspect="aspect-[2/3]"
              />
              <PicksItem
                img="/girl4.jpg"
                brand="Balenciaga"
                name="Hourglass Blazer"
                price="$2850"
                aspect="aspect-[2/3]"
              />
            </div>

            {/* Column 2 */}
            <div className="flex flex-col gap-24 md:pt-32">
              <PicksItem
                img="/girl.jpg"
                brand="The Row"
                name="Half Moon Leather Bag"
                price="$1290"
                aspect="aspect-[3/4]"
              />
              <PicksItem
                img="/girl5.jpg"
                brand="Bottega Veneta"
                name="Cassette Bag"
                price="$3200"
                aspect="aspect-[4/5]"
              />
            </div>

            {/* Column 3 */}
            <div className="flex flex-col gap-24">
              <PicksItem
                img="/girl2.jpeg"
                brand="Saint Laurent"
                name="Opyum 110 Pumps"
                price="$995"
                aspect="aspect-square"
              />
              <PicksItem
                img="/girl5.jpg"
                brand="Loewe"
                name="Anagram Tank Top"
                price="$390"
                aspect="aspect-square"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Newsletter Section */}
      <section className="relative py-40 bg-black text-white overflow-hidden">
        <motion.div
          initial={{ scale: 1.1 }}
          whileInView={{ scale: 1 }}
          transition={{ duration: 1.5 }}
          className="absolute inset-0 opacity-50"
        >
          <Image src="/girl.jpg" alt="Background" fill className="object-cover grayscale" />
        </motion.div>
        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent" />

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-5xl md:text-7xl font-serif mb-8 tracking-tight"
          >
            Join the Inner Circle
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-gray-300 text-lg mb-12 max-w-2xl mx-auto font-light"
          >
            Values-driven fashion. Early access to new collections and exclusive editorial content directly to your inbox.
          </motion.p>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="flex flex-col sm:flex-row justify-center max-w-lg mx-auto"
          >
            <input
              type="email"
              placeholder="Enter your email address"
              className="w-full bg-white/10 backdrop-blur-sm border border-white/20 px-8 py-5 text-white focus:outline-none focus:bg-white/20 placeholder-gray-400 transition-all text-sm"
            />
            <button className="bg-white text-black font-bold uppercase tracking-widest px-10 py-5 text-xs hover:bg-[#EADCD6] transition-colors duration-300">
              Subscribe
            </button>
          </motion.div>
        </div>
      </section>

    </div>
  );
}
