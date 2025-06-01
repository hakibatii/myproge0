import { PayPalButtons } from '@paypal/react-paypal-js';
import { View } from 'react-native';

type PayPalCheckoutProps = {
  amount: string;
  onSuccess: (details: any) => void;
  fundingSource: 'paypal' | 'card';
};

export default function PayPalCheckout({ 
  amount, 
  onSuccess, 
  fundingSource 
}: PayPalCheckoutProps) {
  return (
    <View style={{ marginTop: 16 }}>
      <PayPalButtons
        fundingSource={fundingSource}
        style={{ 
          layout: 'vertical', 
          label: fundingSource === 'paypal' ? 'paypal' : 'card' 
        }}
        createOrder={(data, actions) => {
          return actions.order.create({
            purchase_units: [
              {
                amount: {
                  value: amount,
                },
              },
            ],
          });
        }}
        onApprove={async (data, actions) => {
          const details = await actions.order?.capture();
          if (details) {
            onSuccess(details);
          }
        }}
      />
    </View>
  );
}