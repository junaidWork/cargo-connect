import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { FormField } from "./form-field";

interface AddressFieldsProps {
  type: "sender" | "recipient";
  values: {
    [key: string]: string;
  };
  handleChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  handleSelectChange: (name: string, value: string) => void;
}

export function AddressFields({
  type,
  values,
  handleChange,
  handleSelectChange,
}: AddressFieldsProps) {
  const capitalize = (str: string) => {
    return str.charAt(0).toUpperCase() + str.slice(1);
  };

  return (
    <div className="space-y-4">
      <h2 className="text-xl font-semibold">{capitalize(type)} Information</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <FormField id={`${type}Name`} label="Full Name" required>
          <Input
            id={`${type}Name`}
            name={`${type}Name`}
            value={values[`${type}Name`]}
            onChange={handleChange}
          />
        </FormField>
        <FormField id={`${type}Email`} label="Email" required>
          <Input
            id={`${type}Email`}
            name={`${type}Email`}
            type="email"
            value={values[`${type}Email`]}
            onChange={handleChange}
          />
        </FormField>
        <FormField id={`${type}Phone`} label="Phone Number" required>
          <Input
            id={`${type}Phone`}
            name={`${type}Phone`}
            value={values[`${type}Phone`]}
            onChange={handleChange}
          />
        </FormField>
        <FormField id={`${type}Country`} label="Country" required>
          <Select
            value={values[`${type}Country`]}
            onValueChange={(value) =>
              handleSelectChange(`${type}Country`, value)
            }
          >
            <SelectTrigger id={`${type}Country`}>
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
        </FormField>
        <FormField
          id={`${type}Address`}
          label="Address"
          required
          className="md:col-span-2"
        >
          <Input
            id={`${type}Address`}
            name={`${type}Address`}
            value={values[`${type}Address`]}
            onChange={handleChange}
          />
        </FormField>
        <FormField id={`${type}City`} label="City" required>
          <Input
            id={`${type}City`}
            name={`${type}City`}
            value={values[`${type}City`]}
            onChange={handleChange}
          />
        </FormField>
        <FormField id={`${type}State`} label="State/Province" required>
          <Input
            id={`${type}State`}
            name={`${type}State`}
            value={values[`${type}State`]}
            onChange={handleChange}
          />
        </FormField>
        <FormField id={`${type}Zip`} label="ZIP/Postal Code" required>
          <Input
            id={`${type}Zip`}
            name={`${type}Zip`}
            value={values[`${type}Zip`]}
            onChange={handleChange}
          />
        </FormField>
      </div>
    </div>
  );
}
