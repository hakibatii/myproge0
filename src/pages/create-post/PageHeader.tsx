
import React from 'react';
import { X } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";

interface PageHeaderProps {
  isOnline: boolean;
  canSubmit: boolean;
  onSubmit: (e: React.FormEvent) => void;  // Updated type signature
}

const PageHeader = ({ isOnline, canSubmit, onSubmit }: PageHeaderProps) => {
  const navigate = useNavigate();

  return (
    <div className="flex items-center justify-between p-4 border-b border-gray-200 dark:border-gray-700">
      <Button
        variant="ghost"
        size="icon"
        onClick={() => navigate("/home")}
        className="text-gray-500"
      >
        <X size={24} />
      </Button>
      <h1 className="font-bold text-lg">إنشاء منشور جديد</h1>
      <Button
        onClick={onSubmit}  // No need to change this as the parent will provide the correct function
        disabled={!canSubmit || !isOnline}
        className="bg-morocco-turquoise hover:bg-morocco-turquoise/90 text-white rtl"
      >
        نشر
      </Button>
    </div>
  );
};

export default PageHeader;
