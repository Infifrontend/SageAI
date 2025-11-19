
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { CreditCard, Wallet, Building2 } from "lucide-react";
import "./BillingPayment.scss";

interface BillingPaymentProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export default function BillingPayment({ open, onOpenChange }: BillingPaymentProps) {
  const [selectedMethod, setSelectedMethod] = useState<string>("card");
  const [cardData, setCardData] = useState({
    nameOnCard: "",
    cardNumber: "",
    expiry: "",
    cvc: "",
  });
  const [upiId, setUpiId] = useState("");
  const [selectedWallet, setSelectedWallet] = useState("");
  const [selectedBank, setSelectedBank] = useState("");

  const handleClose = () => {
    onOpenChange(false);
  };

  const handleSaveCard = () => {
    console.log("Saving card payment method:", cardData);
    // TODO: Implement actual save logic
    handleClose();
  };

  const handlePayWithUPI = () => {
    console.log("Paying with UPI:", upiId);
    // TODO: Implement UPI payment logic
    handleClose();
  };

  const handleSelectWallet = (wallet: string) => {
    setSelectedWallet(wallet);
    console.log("Selected wallet:", wallet);
    // TODO: Implement wallet payment logic
  };

  const handleProceedToNetBanking = () => {
    console.log("Proceeding to net banking with bank:", selectedBank);
    // TODO: Implement net banking logic
    handleClose();
  };

  const wallets = [
    { id: "paytm", name: "PayTM", icon: Wallet },
    { id: "phonepe", name: "PhonePe", icon: Wallet },
    { id: "gpay", name: "GPay", icon: Wallet },
    { id: "paypal", name: "PayPal", icon: Wallet },
  ];

  const banks = [
    { id: "sbi", name: "SBI" },
    { id: "hdfc", name: "HDFC" },
    { id: "icici", name: "ICICI" },
    { id: "axis", name: "Axis Bank" },
    { id: "kotak", name: "Kotak Bank" },
  ];

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="cls-billing-payment-dialog">
        <DialogHeader>
          <DialogTitle className="cls-dialog-title">
            <CreditCard size={20} />
            Update Payment Method
          </DialogTitle>
          <p className="cls-dialog-subtitle">
            Choose a payment method and enter your details below.
          </p>
        </DialogHeader>

        <div className="cls-payment-content">
          <Accordion
            type="single"
            collapsible
            value={selectedMethod}
            onValueChange={setSelectedMethod}
            className="cls-payment-accordion"
          >
            {/* Card Payment */}
            <AccordionItem value="card" className="cls-accordion-item">
              <AccordionTrigger className="cls-accordion-trigger">
                Card
              </AccordionTrigger>
              <AccordionContent className="cls-accordion-content">
                <div className="cls-card-form">
                  <div className="cls-form-field">
                    <Label htmlFor="nameOnCard">Name on Card</Label>
                    <Input
                      id="nameOnCard"
                      placeholder="John M. Doe"
                      value={cardData.nameOnCard}
                      onChange={(e) =>
                        setCardData({ ...cardData, nameOnCard: e.target.value })
                      }
                    />
                  </div>

                  <div className="cls-form-field">
                    <Label htmlFor="cardNumber">Card Number</Label>
                    <Input
                      id="cardNumber"
                      placeholder="0000 0000 0000 0000"
                      value={cardData.cardNumber}
                      onChange={(e) =>
                        setCardData({ ...cardData, cardNumber: e.target.value })
                      }
                    />
                  </div>

                  <div className="cls-form-row">
                    <div className="cls-form-field">
                      <Label htmlFor="expiry">Expiry (MM/YY)</Label>
                      <Input
                        id="expiry"
                        placeholder="MM/YY"
                        value={cardData.expiry}
                        onChange={(e) =>
                          setCardData({ ...cardData, expiry: e.target.value })
                        }
                      />
                    </div>
                    <div className="cls-form-field">
                      <Label htmlFor="cvc">CVC</Label>
                      <Input
                        id="cvc"
                        placeholder="123"
                        value={cardData.cvc}
                        onChange={(e) =>
                          setCardData({ ...cardData, cvc: e.target.value })
                        }
                      />
                    </div>
                  </div>

                  <div className="cls-form-actions">
                    <Button variant="outline" onClick={handleClose}>
                      Cancel
                    </Button>
                    <Button onClick={handleSaveCard}>
                      Save Payment Method
                    </Button>
                  </div>
                </div>
              </AccordionContent>
            </AccordionItem>

            {/* UPI Payment */}
            <AccordionItem value="upi" className="cls-accordion-item">
              <AccordionTrigger className="cls-accordion-trigger">
                UPI
              </AccordionTrigger>
              <AccordionContent className="cls-accordion-content">
                <div className="cls-upi-form">
                  <div className="cls-form-field">
                    <Label htmlFor="upiId">UPI ID</Label>
                    <Input
                      id="upiId"
                      placeholder="yourname@bank"
                      value={upiId}
                      onChange={(e) => setUpiId(e.target.value)}
                    />
                  </div>

                  <div className="cls-form-actions">
                    <Button variant="outline" onClick={handleClose}>
                      Cancel
                    </Button>
                    <Button onClick={handlePayWithUPI}>Pay with UPI</Button>
                  </div>
                </div>
              </AccordionContent>
            </AccordionItem>

            {/* Wallets */}
            <AccordionItem value="wallets" className="cls-accordion-item">
              <AccordionTrigger className="cls-accordion-trigger">
                Wallets
              </AccordionTrigger>
              <AccordionContent className="cls-accordion-content">
                <div className="cls-wallets-section">
                  <p className="cls-section-label">Select a Wallet</p>
                  <div className="cls-wallets-grid">
                    {wallets.map((wallet) => (
                      <button
                        key={wallet.id}
                        className={`cls-wallet-option ${
                          selectedWallet === wallet.id ? "cls-selected" : ""
                        }`}
                        onClick={() => handleSelectWallet(wallet.id)}
                      >
                        <Wallet size={20} />
                        {wallet.name}
                      </button>
                    ))}
                  </div>
                </div>
              </AccordionContent>
            </AccordionItem>

            {/* Net Banking */}
            <AccordionItem value="netbanking" className="cls-accordion-item">
              <AccordionTrigger className="cls-accordion-trigger">
                Net Banking
              </AccordionTrigger>
              <AccordionContent className="cls-accordion-content">
                <div className="cls-netbanking-form">
                  <div className="cls-form-field">
                    <Label htmlFor="selectBank">Select Bank</Label>
                    <Select value={selectedBank} onValueChange={setSelectedBank}>
                      <SelectTrigger id="selectBank">
                        <SelectValue placeholder="Select your bank" />
                      </SelectTrigger>
                      <SelectContent>
                        {banks.map((bank) => (
                          <SelectItem key={bank.id} value={bank.id}>
                            <div className="cls-bank-option">
                              <Building2 size={16} />
                              {bank.name}
                            </div>
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="cls-form-actions">
                    <Button variant="outline" onClick={handleClose}>
                      Cancel
                    </Button>
                    <Button onClick={handleProceedToNetBanking}>
                      Proceed to Net Banking
                    </Button>
                  </div>
                </div>
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </div>
      </DialogContent>
    </Dialog>
  );
}
