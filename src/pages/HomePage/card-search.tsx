import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Search } from 'lucide-react';
import { Form, FormControl, FormField, FormItem, FormLabel } from '@/components/ui/form';
import { z } from 'zod';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
type CardSearchProps = {
  className?: string;
  sizeList: any[];
  warnList: any[];
  priceList: any[];
  findRoom: (value: any) => void;
};
export default function CardSearch({ className, sizeList, warnList, priceList, findRoom }: Readonly<CardSearchProps>) {
  const FormSchema = z.object({
    ward: z.string().optional(),
    size: z.string().optional(),
    price: z.string().optional(),
  });
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
  });
  return (
    <Card className={className}>
      <CardHeader>
        <CardTitle>Tìm kiếm thông tin căn hộ</CardTitle>
      </CardHeader>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(findRoom)}>
          <div className="flex flex-col md:flex-row">
            <CardContent>
              <FormField
                control={form.control}
                name="ward"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Khu Vực</FormLabel>
                    <Select onValueChange={field.onChange}>
                      <FormControl>
                        <SelectTrigger className="md:w-[230px]">
                          <SelectValue placeholder="Tìm kiếm theo khu vực" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {warnList.map((item: any, index) => (
                          <SelectItem
                            key={index}
                            value={item.ward_id}
                          >
                            {item.ward_name}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </FormItem>
                )}
              />
            </CardContent>
            <CardContent>
              <FormField
                control={form.control}
                name="size"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel> Diện tích tìm kiếm </FormLabel>
                    <Select onValueChange={field.onChange}>
                      <FormControl>
                        <SelectTrigger className="md:w-[230px]">
                          <SelectValue placeholder="Tìm kiếm theo diện tích" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {sizeList.map((item: any, index) => (
                          <SelectItem
                            key={index}
                            value={item.value}
                          >
                            {item.title}
                            <sub>
                              m<sup>2</sup>
                            </sub>
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </FormItem>
                )}
              />
            </CardContent>
            <CardContent>
              <FormField
                control={form.control}
                name="price"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Khoảng giá tìm kiếm</FormLabel>
                    <Select onValueChange={field.onChange}>
                      <FormControl>
                        <SelectTrigger className="md:w-[230px]">
                          <SelectValue placeholder="Tìm kiếm theo khoảng giá" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {priceList.map((item: any, index) => (
                          <SelectItem
                            key={index}
                            value={item.value}
                          >
                            {item.title}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </FormItem>
                )}
              />
            </CardContent>
            <CardContent>
              <Button>
                <Search className="me-4" /> Tìm Kiếm
              </Button>
            </CardContent>
          </div>
        </form>
      </Form>
    </Card>
  );
}
