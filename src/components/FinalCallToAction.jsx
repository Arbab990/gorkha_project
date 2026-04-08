import { motion } from "framer-motion";
import { Link } from "react-router-dom";

export default function FinalCallToAction() {
    return (
        <section className="py-20 px-6 bg-gray-50/60">
            <div className="max-w-6xl mx-auto">
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "-100px" }}
                    transition={{ duration: 0.6 }}
                    className="relative overflow-hidden rounded-[2rem] px-8 py-16 md:px-14 md:py-24 text-center shadow-xl bg-cover bg-center"
                    style={{
                        backgroundImage:
                            "url('/images/beautiful-scenery-mountainous-landscape-covered-with-snow-cloudy-sky.jpg')",
                    }}
                >
                    <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(14,33,26,0.82),rgba(9,18,14,0.9),rgba(14,33,26,0.82))]" />
                    <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(45,106,79,0.45),transparent_28%),radial-gradient(circle_at_bottom_right,rgba(45,106,79,0.4),transparent_30%)]" />

                    <div className="relative z-10 max-w-3xl mx-auto">
                        <h2 className="font-heading text-4xl md:text-5xl font-bold text-white leading-tight mb-5">
                            Be a part of a legacy that serves since 1968
                        </h2>
                        <p className="text-white/75 text-base md:text-lg leading-relaxed mb-10">
                            Join a community rooted in service, dignity, and cultural pride. Help us carry this legacy forward through membership, support, and active participation.
                        </p>

                        <div className="flex flex-wrap items-center justify-center gap-4">
                            <motion.div whileHover={{ scale: 1.04, y: -2 }} whileTap={{ scale: 0.97 }}>
                                <Link
                                    to="/get-involved/become-member"
                                    className="inline-flex items-center justify-center rounded bg-orange px-7 py-3 text-sm font-semibold uppercase tracking-widest text-white transition-colors hover:bg-orange-light"
                                >
                                    Become a Member
                                </Link>
                            </motion.div>

                            <motion.div whileHover={{ scale: 1.04, y: -2 }} whileTap={{ scale: 0.97 }}>
                                <Link
                                    to="/donate"
                                    className="inline-flex items-center justify-center rounded border border-white/25 bg-white/10 px-7 py-3 text-sm font-semibold uppercase tracking-widest text-white backdrop-blur-sm transition-colors hover:bg-white/20"
                                >
                                    Support the Mission
                                </Link>
                            </motion.div>
                        </div>
                    </div>
                </motion.div>
            </div>
        </section>
    );
}
