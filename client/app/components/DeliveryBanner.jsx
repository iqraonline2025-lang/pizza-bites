"use client";
import { motion } from 'framer-motion';
import { Truck, Timer, MapPin } from 'lucide-react'; // If you use lucide-react icons

export default function DeliveryBanner() {
  const infoItems = [
    {
      icon: <Truck className="w-8 h-8 text-yellow-500" />,
      title: "FREE DELIVERY",
      sub: "ON ALL ORDERS OVER £20",
    },
    {
      icon: <Timer className="w-8 h-8 text-red-500" />,
      title: "30 MIN DELIVERY",
      sub: "OR IT'S ON THE HOUSE*",
    },
    {
      icon: <MapPin className="w-8 h-8 text-green-500" />,
      title: "LOCAL SOURCED",
      sub: "FRESH FROM LOCAL FARMS",
    }
  ];

  return (
    <section className="bg-black py-12 border-y border-white/10">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 md:gap-6">
          {infoItems.map((item, index) => (
            <motion.div 
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.2 }}
              className="flex flex-col items-center text-center space-y-4"
            >
              {/* Icon Circle */}
              <div className="w-16 h-16 rounded-full bg-white/5 flex items-center justify-center border border-white/10 group hover:border-white/30 transition-all">
                {item.icon}
              </div>

              {/* Text */}
              <div>
                <h3 className="text-white font-black text-2xl tracking-tighter uppercase leading-none">
                  {item.title}
                </h3>
                <p className="text-gray-500 text-xs font-bold tracking-widest mt-2 uppercase">
                  {item.sub}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}