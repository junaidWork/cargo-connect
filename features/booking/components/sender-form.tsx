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

export function SenderForm({
  formData,
  handleChange,
  handleSelectChange,
}: BookingStepProps) {
  return (
    <div className="space-y-4">
      <h2 className="text-xl font-semibold">Sender Information</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="senderName">Full Name *</Label>
          <Input
            id="senderName"
            name="senderName"
            value={formData.senderName}
            onChange={handleChange}
            required
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="senderEmail">Email *</Label>
          <Input
            id="senderEmail"
            name="senderEmail"
            type="email"
            value={formData.senderEmail}
            onChange={handleChange}
            required
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="senderPhone">Phone Number *</Label>
          <Input
            id="senderPhone"
            name="senderPhone"
            value={formData.senderPhone}
            onChange={handleChange}
            required
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="senderCountry">Country *</Label>
          <Select
            value={formData.senderCountry}
            onValueChange={(value) =>
              handleSelectChange("senderCountry", value)
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
          <Label htmlFor="senderAddress">Address *</Label>
          <Input
            id="senderAddress"
            name="senderAddress"
            value={formData.senderAddress}
            onChange={handleChange}
            required
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="senderCity">City *</Label>
          <Input
            id="senderCity"
            name="senderCity"
            value={formData.senderCity}
            onChange={handleChange}
            required
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="senderState">State/Province *</Label>
          <Input
            id="senderState"
            name="senderState"
            value={formData.senderState}
            onChange={handleChange}
            required
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="senderPostal">ZIP/Postal Code *</Label>
          <Input
            id="senderPostal"
            name="senderPostal"
            value={formData.senderPostal}
            onChange={handleChange}
            required
          />
        </div>
      </div>
    </div>
  );
}
