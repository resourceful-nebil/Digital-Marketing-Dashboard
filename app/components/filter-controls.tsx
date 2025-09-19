'use client';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

interface FilterControlsProps {
  onFilterChange: (filters: { grade?: string; startDate?: string; endDate?: string }) => void;
}

export function FilterControls({ onFilterChange }: FilterControlsProps) {
  return (
    <div className="bg-card rounded-lg border border-border p-4 lg:p-6">
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 items-end">
        <div className="space-y-2">
          <Label htmlFor="grade-select">Grade Level</Label>
          <Select onValueChange={(value) => onFilterChange({ grade: value })} defaultValue="all">
            <SelectTrigger id="grade-select">
              <SelectValue placeholder="Select grade" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Grades</SelectItem>
              <SelectItem value="9">Grade 9</SelectItem>
              <SelectItem value="10">Grade 10</SelectItem>
              <SelectItem value="11">Grade 11</SelectItem>
              <SelectItem value="12">Grade 12</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <div className="space-y-2">
          <Label htmlFor="start-date">Start Date</Label>
          <Input id="start-date" type="date" onChange={(e) => onFilterChange({ startDate: e.target.value })} />
        </div>
        <div className="space-y-2">
          <Label htmlFor="end-date">End Date</Label>
          <Input id="end-date" type="date" onChange={(e) => onFilterChange({ endDate: e.target.value })} />
        </div>
        <Button className="bg-primary text-primary-foreground hover:bg-primary/90">Apply Filters</Button>
      </div>
    </div>
  );
}