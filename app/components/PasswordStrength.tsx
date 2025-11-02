"use client";

import { useState, useEffect } from "react";
import { Check, X } from "lucide-react";

interface PasswordStrengthProps {
  password: string;
}

interface PasswordCriteria {
  label: string;
  test: (password: string) => boolean;
}

export default function PasswordStrength({ password }: PasswordStrengthProps) {
  const [strength, setStrength] = useState<'weak' | 'medium' | 'strong'>('weak');
  
  const criteria: PasswordCriteria[] = [
    { label: "At least 8 characters", test: (pwd) => pwd.length >= 8 },
    { label: "Contains uppercase letter", test: (pwd) => /[A-Z]/.test(pwd) },
    { label: "Contains lowercase letter", test: (pwd) => /[a-z]/.test(pwd) },
    { label: "Contains number", test: (pwd) => /\d/.test(pwd) },
    { label: "Contains special character", test: (pwd) => /[!@#$%^&*(),.?":{}|<>]/.test(pwd) },
  ];

  useEffect(() => {
    if (!password) {
      setStrength('weak');
      return;
    }

    const passedCriteria = criteria.filter(criterion => criterion.test(password)).length;
    
    if (passedCriteria <= 2) {
      setStrength('weak');
    } else if (passedCriteria <= 4) {
      setStrength('medium');
    } else {
      setStrength('strong');
    }
  }, [password]);

  if (!password) return null;

  const getStrengthColor = () => {
    switch (strength) {
      case 'weak': return 'text-red-600 bg-red-50 border-red-200';
      case 'medium': return 'text-yellow-600 bg-yellow-50 border-yellow-200';
      case 'strong': return 'text-green-600 bg-green-50 border-green-200';
    }
  };

  const getStrengthText = () => {
    switch (strength) {
      case 'weak': return 'Weak Password';
      case 'medium': return 'Medium Password';
      case 'strong': return 'Strong Password';
    }
  };

  return (
    <div className="mt-3">
      <div className={`p-3 rounded-lg border ${getStrengthColor()}`}>
        <div className="flex items-center gap-2 mb-2">
          <div className="text-sm font-medium">{getStrengthText()}</div>
        </div>
        
        <div className="space-y-1">
          {criteria.map((criterion, index) => {
            const passed = criterion.test(password);
            return (
              <div key={index} className="flex items-center gap-2 text-xs">
                {passed ? (
                  <Check className="w-3 h-3 text-green-500" />
                ) : (
                  <X className="w-3 h-3 text-gray-400" />
                )}
                <span className={passed ? 'text-green-600' : 'text-gray-500'}>
                  {criterion.label}
                </span>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}