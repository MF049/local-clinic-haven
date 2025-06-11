
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { CreditCard, Banknote } from 'lucide-react';

interface PaymentMethodSelectionProps {
  paymentMethod: 'card' | 'cash';
  onSelectPaymentMethod: (method: 'card' | 'cash') => void;
}

export const PaymentMethodSelection: React.FC<PaymentMethodSelectionProps> = ({
  paymentMethod,
  onSelectPaymentMethod,
}) => {
  return (
    <div>
      <h3 className="text-lg font-semibold mb-4 text-right">طريقة الدفع:</h3>
      <div className="grid grid-cols-2 gap-4">
        <Card
          className={`cursor-pointer transition-all ${
            paymentMethod === 'cash'
              ? 'ring-2 ring-blue-500 bg-blue-50'
              : 'hover:shadow-md'
          }`}
          onClick={() => onSelectPaymentMethod('cash')}
        >
          <CardContent className="p-4 text-center">
            <Banknote className="h-8 w-8 mx-auto mb-2 text-green-600" />
            <span className="font-medium">نقداً</span>
          </CardContent>
        </Card>
        <Card
          className={`cursor-pointer transition-all ${
            paymentMethod === 'card'
              ? 'ring-2 ring-blue-500 bg-blue-50'
              : 'hover:shadow-md'
          }`}
          onClick={() => onSelectPaymentMethod('card')}
        >
          <CardContent className="p-4 text-center">
            <CreditCard className="h-8 w-8 mx-auto mb-2 text-blue-600" />
            <span className="font-medium">بطاقة ائتمان</span>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};
