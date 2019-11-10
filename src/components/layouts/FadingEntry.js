import React from "react";
import { AnimatePresence, motion } from "framer-motion";

/* An helper component to handle the graceful appear of something on screen. Framer Motion makes it pretty easy! */

export default function FadingEntry ({children, isVisible = false}) {
    return (
        <AnimatePresence>
            {isVisible ? <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0, transition: { duration: 0.25 } }} exit={{ opacity: 0, y: 10 }}>
                {children}
            </motion.div> : null}
        </AnimatePresence>
    );
}