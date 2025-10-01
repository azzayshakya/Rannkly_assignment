import { motion } from "framer-motion";
import { Users, CheckSquare, Shield } from "lucide-react";

export default function Home() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-indigo-50 via-white to-indigo-100 px-6">
      <main className="max-w-3xl text-center space-y-12">
        <motion.h1
          initial={{ opacity: 0, y: -30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-5xl md:text-6xl font-extrabold text-gray-900 tracking-tight drop-shadow-sm"
        >
          Welcome to <span className="text-indigo-600">TaskFlow</span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4, duration: 1 }}
          className="text-lg md:text-xl text-gray-600 max-w-2xl mx-auto leading-relaxed"
        >
          Organize work, assign roles, and keep your team flowing — all in one
          place. Built for Admins, Managers, and Employees.
        </motion.p>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8, duration: 1 }}
          className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-10"
        >
          <div className="flex flex-col items-center space-y-3">
            <Users className="w-10 h-10 text-indigo-500" />
            <p className="text-gray-700 font-medium">Team Collaboration</p>
          </div>

          <div className="flex flex-col items-center space-y-3">
            <CheckSquare className="w-10 h-10 text-green-500" />
            <p className="text-gray-700 font-medium">Task Management</p>
          </div>

          <div className="flex flex-col items-center space-y-3">
            <Shield className="w-10 h-10 text-blue-500" />
            <p className="text-gray-700 font-medium">Role-based Security</p>
          </div>
        </motion.div>

      
      </main>
    </div>
  );
}
