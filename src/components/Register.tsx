import React, { useState } from 'react';
import { validateEmail, validatePassword, validateFullName, validateUsername } from '../utils/validation';
import { RegistrationForm } from './auth/RegistrationForm';
import { HealthProfileForm } from './auth/HealthProfileForm';
import type { ValidationError, RegistrationFormData, HealthProfile } from '../types';

interface RegisterProps {
  onRegister: (username: string, email: string, password: string, fullName: string, healthProfile: HealthProfile) => void;
  onSwitchToLogin: () => void;
}

const initialHealthProfile: HealthProfile = {
  height: 170,
  weight: 70,
  healthConditions: {
    diabetes: false,
    highBloodPressure: false,
    heartDisease: false,
    allergies: [],
  },
  dietaryRestrictions: [],
  fitnessGoal: 'maintenance',
};

export function Register({ onRegister, onSwitchToLogin }: RegisterProps) {
  const [step, setStep] = useState<'basic' | 'health'>('basic');
  const [formData, setFormData] = useState<RegistrationFormData>({
    username: '',
    email: '',
    password: '',
    fullName: '',
    healthProfile: initialHealthProfile,
  });
  const [errors, setErrors] = useState<ValidationError[]>([]);

  const validateBasicInfo = (): boolean => {
    const newErrors: ValidationError[] = [];
    
    const emailError = validateEmail(formData.email);
    const passwordError = validatePassword(formData.password);
    const fullNameError = validateFullName(formData.fullName);
    const usernameError = validateUsername(formData.username);

    if (emailError) newErrors.push({ field: 'email', message: emailError });
    if (passwordError) newErrors.push({ field: 'password', message: passwordError });
    if (fullNameError) newErrors.push({ field: 'fullName', message: fullNameError });
    if (usernameError) newErrors.push({ field: 'username', message: usernameError });

    setErrors(newErrors);
    return newErrors.length === 0;
  };

  const handleBasicSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (validateBasicInfo()) {
      setStep('health');
    }
  };

  const handleHealthProfileChange = (healthProfile: HealthProfile) => {
    setFormData(prev => ({ ...prev, healthProfile }));
  };

  const handleHealthProfileSubmit = () => {
    onRegister(
      formData.username,
      formData.email,
      formData.password,
      formData.fullName,
      formData.healthProfile
    );
  };

  const handleInputChange = (field: keyof RegistrationFormData, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  if (step === 'health') {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-md w-full">
          <HealthProfileForm
            healthProfile={formData.healthProfile}
            onChange={handleHealthProfileChange}
            onBack={() => setStep('basic')}
            onSubmit={handleHealthProfileSubmit}
          />
        </div>
      </div>
    );
  }

  return (
    <RegistrationForm
      formData={formData}
      errors={errors}
      onInputChange={handleInputChange}
      onSubmit={handleBasicSubmit}
      onSwitchToLogin={onSwitchToLogin}
    />
  );
}