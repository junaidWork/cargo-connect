import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { BookingStepProps } from "../types";

export function RecipientForm({
  formData,
  handleChange,
  handleSelectChange,
}: BookingStepProps) {
  return (
    <div className="space-y-4">
      <h2 className="text-xl font-semibold">Recipient Information</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="recipientName">Full Name *</Label>
          <Input
            id="recipientName"
            name="recipientName"
            value={formData.recipientName}
            onChange={handleChange}
            required
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="recipientEmail">Email *</Label>
          <Input
            id="recipientEmail"
            name="recipientEmail"
            type="email"
            value={formData.recipientEmail}
            onChange={handleChange}
            required
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="recipientPhone">Phone Number *</Label>
          <Input
            id="recipientPhone"
            name="recipientPhone"
            value={formData.recipientPhone}
            onChange={handleChange}
            required
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="recipientCountry">Country *</Label>
          <Select
            value={formData.recipientCountry}
            onValueChange={(value) =>
              handleSelectChange("recipientCountry", value)
            }
          >
            <SelectTrigger>
              <SelectValue placeholder="Select country" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="United States">United States</SelectItem>
              <SelectItem value="Canada">Canada</SelectItem>
              <SelectItem value="United Kingdom">United Kingdom</SelectItem>
              <SelectItem value="Australia">Australia</SelectItem>
              <SelectItem value="Germany">Germany</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <div className="space-y-2 md:col-span-2">
          <Label htmlFor="recipientAddress">Address *</Label>
          <Input
            id="recipientAddress"
            name="recipientAddress"
            value={formData.recipientAddress}
            onChange={handleChange}
            required
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="recipientCity">City *</Label>
          <Input
            id="recipientCity"
            name="recipientCity"
            value={formData.recipientCity}
            onChange={handleChange}
            required
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="recipientState">State/Province *</Label>
          <Input
            id="recipientState"
            name="recipientState"
            value={formData.recipientState}
            onChange={handleChange}
            required
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="recipientPostal">ZIP/Postal Code *</Label>
          <Input
            id="recipientPostal"
            name="recipientPostal"
            value={formData.recipientPostal}
            onChange={handleChange}
            required
          />
        </div>
      </div>
    </div>
  );
}
