import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Separator } from "@/components/ui/separator";
import { BookingStepProps } from "../types";

export function ShippingForm({
  formData,
  handleChange,
  handleSelectChange,
}: BookingStepProps) {
  return (
    <div className="space-y-4">
      <h2 className="text-xl font-semibold">Shipping Options</h2>
      <div className="space-y-4">
        <div className="space-y-2">
          <Label>Service Type *</Label>
          <RadioGroup
            value={formData.serviceType}
            onValueChange={(value) => handleSelectChange("serviceType", value)}
            className="flex flex-col space-y-2"
          >
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="express" id="express" />
              <Label htmlFor="express">Express (1-2 business days)</Label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="standard" id="standard" />
              <Label htmlFor="standard">Standard (3-5 business days)</Label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="economy" id="economy" />
              <Label htmlFor="economy">Economy (5-7 business days)</Label>
            </div>
          </RadioGroup>
        </div>

        <div className="space-y-2">
          <Label>Insurance *</Label>
          <RadioGroup
            value={formData.insurance}
            onValueChange={(value) => handleSelectChange("insurance", value)}
            className="flex flex-col space-y-2"
          >
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="none" id="none" />
              <Label htmlFor="none">No Insurance</Label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="basic" id="basic" />
              <Label htmlFor="basic">Basic Coverage (up to $100)</Label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="extended" id="extended" />
              <Label htmlFor="extended">Extended Coverage (up to $1000)</Label>
            </div>
          </RadioGroup>
        </div>

        <div className="space-y-2">
          <Label htmlFor="pickupDate">Pickup Date *</Label>
          <Input
            id="pickupDate"
            name="pickupDate"
            type="date"
            value={formData.pickupDate}
            onChange={handleChange}
            required
          />
        </div>

        <OrderSummary formData={formData} />
      </div>
    </div>
  );
}

function OrderSummary({
  formData,
}: {
  formData: BookingStepProps["formData"];
}) {
  return (
    <>
      <Separator className="my-6" />

      <div className="bg-muted p-4 rounded-lg">
        <h3 className="font-medium mb-2">Order Summary</h3>
        <div className="space-y-2 text-sm">
          <div className="flex justify-between">
            <span>Service Type:</span>
            <span className="font-medium">
              {formData.serviceType.charAt(0).toUpperCase() +
                formData.serviceType.slice(1)}
            </span>
          </div>
          <div className="flex justify-between">
            <span>Package Type:</span>
            <span className="font-medium">
              {formData.packageType.charAt(0).toUpperCase() +
                formData.packageType.slice(1)}
            </span>
          </div>
          <div className="flex justify-between">
            <span>Weight:</span>
            <span className="font-medium">{formData.packageWeight} kg</span>
          </div>
          <div className="flex justify-between">
            <span>Dimensions:</span>
            <span className="font-medium">
              {formData.packageLength} × {formData.packageWidth} ×{" "}
              {formData.packageHeight} cm
            </span>
          </div>
          <div className="flex justify-between">
            <span>Insurance:</span>
            <span className="font-medium">
              {formData.insurance.charAt(0).toUpperCase() +
                formData.insurance.slice(1)}
            </span>
          </div>
          <Separator className="my-2" />
          <div className="flex justify-between font-medium">
            <span>Estimated Total:</span>
            <span>$78.50</span>
          </div>
        </div>
      </div>
    </>
  );
}
