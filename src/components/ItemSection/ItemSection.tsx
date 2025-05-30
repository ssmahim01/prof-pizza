"use client"
import React from "react"
import { motion } from "framer-motion"
import Image from "next/image"
import { Dialog, DialogTrigger } from "@/components/ui/dialog"
import MixPicaDetailModal from "../MixPicaDetailModal/MixPicaDetailModal"

const ItemSection: React.FC = () => {
  const [isModalOpen, setIsModalOpen] = React.useState<boolean>(false)

  return (
    <>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
        className="w-full bg-[#d37864dd] py-12 md:py-16 flex justify-center items-center gap-4 md:gap-6 px-4 sm:px-6 lg:px-8"
      >
        <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
          <DialogTrigger asChild>
            <div className="flex flex-col md:flex-row justify-center items-center gap-4 md:gap-6 cursor-pointer group">
              <div className="flex justify-center items-center">
                <Image
                  width={250}
                  height={250}
                  priority
                  quality={100}
                  src="/pizza-image.png"
                  alt="Mix Pizza"
                  className="object-contain group-hover:scale-105 transition-transform duration-300"
                />
              </div>
              <div className="flex flex-col items-center md:items-start text-center md:text-left">
                <span className="text-3xl md:text-4xl font-semibold text-gray-800 group-hover:text-gray-900 transition-colors">
                  MIX <br className="md:hidden" /> pica
                </span>
                <span className="text-lg md:text-xl font-medium text-gray-700 group-hover:text-gray-800 transition-colors">
                  Susikurk <br className="md:hidden" /> skaniausią
                </span>
              </div>
            </div>
          </DialogTrigger>
        </Dialog>
        <MixPicaDetailModal isOpen={isModalOpen} onOpenChange={setIsModalOpen} />
      </motion.div>
    </>
  )
}

export default ItemSection