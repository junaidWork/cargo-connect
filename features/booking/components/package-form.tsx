import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { BookingStepProps } from "../types";

export function PackageForm({
  formData,
  handleChange,
  handleSelectChange,
}: BookingStepProps) {
  return (
    <div className="space-y-4">
      <h2 className="text-xl font-semibold">Package Details</h2>
      <div className="space-y-4">
        <div className="space-y-2">
          <Label>Package Type *</Label>
          <RadioGroup
            value={formData.packageType}
            onValueChange={(value) => handleSelectChange("packageType", value)}
            className="flex flex-col space-y-2"
          >
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="document" id="document" />
              <Label htmlFor="document">Document</Label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="parcel" id="parcel" />
              <Label htmlFor="parcel">Parcel</Label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="pallet" id="pallet" />
              <Label htmlFor="pallet">Pallet</Label>
            </div>
          </RadioGroup>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div className="space-y-2">
            <Label htmlFor="packageWeight">Weight (kg) *</Label>
            <Input
              id="packageWeight"
              name="packageWeight"
              type="number"
              min="0.1"
              step="0.1"
              value={formData.packageWeight}
              onChange={handleChange}
              required
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="packageLength">Length (cm) *</Label>
            <Input
              id="packageLength"
              name="packageLength"
              type="number"
              min="1"
              value={formData.packageLength}
              onChange={handleChange}
              required
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="packageWidth">Width (cm) *</Label>
            <Input
              id="packageWidth"
              name="packageWidth"
              type="number"
              min="1"
              value={formData.packageWidth}
              onChange={handleChange}
              required
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="packageHeight">Height (cm) *</Label>
            <Input
              id="packageHeight"
              name="packageHeight"
              type="number"
              min="1"
              value={formData.packageHeight}
              onChange={handleChange}
              required
            />
          </div>
        </div>

        <div className="space-y-2">
          <Label htmlFor="packageDescription">Package Description</Label>
          <Textarea
            id="packageDescription"
            name="packageDescription"
            placeholder="Describe the contents of your package"
            value={formData.packageDescription}
            onChange={handleChange}
          />
        </div>
      </div>
    </div>
  );
}
