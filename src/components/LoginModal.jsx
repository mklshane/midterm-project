import React, { useState, useEffect } from "react";
import { useAuth } from "../contexts/AuthContext";
import { useToast } from "../contexts/ToastContext";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "./ui/dialog";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import { X, User, Sparkles } from "lucide-react";

const LoginModal = ({ isOpen, onClose }) => {
  const [name, setName] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { login } = useAuth();

  useEffect(() => {
    if (isOpen) {
      setName("");
      setIsSubmitting(false);
    }
  }, [isOpen]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!name.trim()) {
      addToast("Please enter your name", "error");
      return;
    }

    setIsSubmitting(true);

    // Simulate a brief network request for better UX
    try {
      await new Promise((resolve) => setTimeout(resolve, 800));
      login(name.trim());
      setName("");
      onClose();
    } catch (error) {
      addToast("Login failed. Please try again.", "error");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter" && !isSubmitting) {
      handleSubmit(e);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md rounded-lg py-12">
        <DialogHeader className="relative">
          <DialogTitle className="text-center text-2xl flex items-center justify-center gap-2">
            <Sparkles className="h-6 w-6 text-blue-500" />
            Welcome to StudySpot PH
           
          </DialogTitle>
         
        </DialogHeader>

        <div className="flex flex-col items-center py-2 px-1">
          

          <p className="text-center text-gray-600 mb-6">
            Enter your name to find and share the best study spots in the
            Philippines!
          </p>

          <form onSubmit={handleSubmit} className="w-full space-y-6">
            <div className="space-y-2">
              <label htmlFor="name" className="text-sm font-medium ">
                Your Name
              </label>
              <Input
                id="name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                onKeyPress={handleKeyPress}
                placeholder="Enter your name"
                autoComplete="off"
                className="w-full py-2 px-4 text-lg mt-2"
                autoFocus
                disabled={isSubmitting}
              />
            </div>

            <div className="flex flex-col gap-3">
              <Button
                type="submit"
                className="w-full py-2 text-base font-medium"
                disabled={isSubmitting || !name.trim()}
              >
                {isSubmitting ? (
                  <>
                    <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                    Logging in...
                  </>
                ) : (
                  "Login"
                )}
              </Button>

              <Button
                type="button"
                variant="outline"
                onClick={onClose}
                disabled={isSubmitting}
                className="w-full"
              >
                Cancel
              </Button>
            </div>
          </form>

          
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default LoginModal;
