"use client";

import { useState, useEffect } from "react";
import { useToast } from "@/hooks/use-toast";
import { api } from "@/lib/api";
import { PageLayout } from "@/components/page-layout";
import {
  CalendarHeader,
  PackagesSidebar,
  WeeklyCalendar,
  getWeekDates,
  formatDate,
  formatDateForSchedule,
} from "@/features/calendar";

interface Package {
  id: string;
  tracking_number: string;
  description: string;
  status: string;
  sender: string;
  recipient: string;
  scheduled_date: string | null;
}

export default function CalendarPage() {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [packages, setPackages] = useState<Package[]>([]);
  const [draggingPackage, setDraggingPackage] = useState<Package | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const { toast } = useToast();

  // Fetch packages on component mount
  useEffect(() => {
    fetchPackages();
  }, []);

  const fetchPackages = async () => {
    try {
      const data = await api.getPackages();
      setPackages(data);
    } catch (error) {
      console.error("Error fetching packages:", error);
      toast({
        title: "Error",
        description: "Failed to load packages. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const weekDates = getWeekDates(currentDate);
  const weekRange = `${formatDate(weekDates[0])} - ${formatDate(weekDates[6])}`;

  const handlePrevWeek = () => {
    const newDate = new Date(currentDate);
    newDate.setDate(currentDate.getDate() - 7);
    setCurrentDate(newDate);
  };

  const handleNextWeek = () => {
    const newDate = new Date(currentDate);
    newDate.setDate(currentDate.getDate() + 7);
    setCurrentDate(newDate);
  };

  const handleDragStart = (pkg: Package) => {
    setDraggingPackage(pkg);
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
  };

  const handleDrop = async (e: React.DragEvent, date: Date) => {
    e.preventDefault();

    if (draggingPackage) {
      const formattedDate = formatDateForSchedule(date);

      try {
        await api.schedulePackage(draggingPackage.id, formattedDate);

        setPackages((prevPackages) =>
          prevPackages.map((pkg) =>
            pkg.id === draggingPackage.id
              ? { ...pkg, scheduled_date: formattedDate }
              : pkg
          )
        );

        toast({
          title: "Package scheduled",
          description: `${
            draggingPackage.description
          } scheduled for ${formatDate(date)}`,
        });
      } catch (error) {
        console.error("Error scheduling package:", error);
        toast({
          title: "Scheduling failed",
          description: "Failed to schedule the package. Please try again.",
          variant: "destructive",
        });
      }

      setDraggingPackage(null);
    }
  };

  const handleRemoveFromCalendar = async (packageId: string) => {
    try {
      await api.unschedulePackage(packageId);

      setPackages((prevPackages) =>
        prevPackages.map((pkg) =>
          pkg.id === packageId ? { ...pkg, scheduled_date: null } : pkg
        )
      );

      toast({
        title: "Package unscheduled",
        description: "Package has been removed from the calendar",
      });
    } catch (error) {
      console.error("Error unscheduling package:", error);
      toast({
        title: "Unscheduling failed",
        description:
          "Failed to remove the package from calendar. Please try again.",
        variant: "destructive",
      });
    }
  };

  // Filter packages for the sidebar (unscheduled)
  const unscheduledPackages = packages.filter(
    (pkg) => pkg.scheduled_date === null
  );

  // Get packages for a specific date
  const getPackagesForDate = (date: Date) => {
    const formattedDate = formatDateForSchedule(date);
    return packages.filter((pkg) => pkg.scheduled_date === formattedDate);
  };

  return (
    <PageLayout>
      <div className="container mx-auto px-4 py-8">
        <CalendarHeader
          currentDate={currentDate}
          weekRange={weekRange}
          onPrevWeek={handlePrevWeek}
          onNextWeek={handleNextWeek}
        />

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          <PackagesSidebar
            isLoading={isLoading}
            packages={unscheduledPackages}
            onDragStart={handleDragStart}
          />

          <WeeklyCalendar
            weekDates={weekDates}
            formatDate={formatDate}
            getPackagesForDate={getPackagesForDate}
            onDragOver={handleDragOver}
            onDrop={handleDrop}
            onRemove={handleRemoveFromCalendar}
          />
        </div>
      </div>
    </PageLayout>
  );
}
