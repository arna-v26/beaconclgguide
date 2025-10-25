import { useState, useEffect } from "react";
import { ChevronLeft, ChevronRight, Calendar, Clock, MapPin } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import techFestImg from "@/assets/events/tech-fest.jpg";
import culturalNightImg from "@/assets/events/cultural-night.jpg";
import sportsMeetImg from "@/assets/events/sports-meet.jpg";
import seminarSeriesImg from "@/assets/events/seminar-series.jpg";
import roboticsWorkshopImg from "@/assets/events/robotics-workshop.jpg";
import fashionShowImg from "@/assets/events/fashion-show.jpg";
import managementSummitImg from "@/assets/events/management-summit.jpg";
import artExhibitionImg from "@/assets/events/art-exhibition.jpg";
import electricalWorkshopImg from "@/assets/events/electrical-workshop.jpg";
import musicConcertImg from "@/assets/events/music-concert.jpg";

const events = [
  {
    id: 1,
    title: "Tech Fest 2025",
    date: "March 15-18, 2025",
    time: "10:00 AM",
    venue: "Main Auditorium",
    discipline: "Technology",
    image: techFestImg,
    registrationLink: "#",
  },
  {
    id: 2,
    title: "Cultural Night",
    date: "March 25, 2025",
    time: "7:00 PM",
    venue: "Open Air Theatre",
    discipline: "Arts & Culture",
    image: culturalNightImg,
    registrationLink: "#",
  },
  {
    id: 3,
    title: "Sports Meet",
    date: "March 22, 2025",
    time: "9:00 AM",
    venue: "Sports Complex",
    discipline: "Athletics",
    image: sportsMeetImg,
    registrationLink: "#",
  },
  {
    id: 4,
    title: "Seminar Series",
    date: "March 25, 2025",
    time: "2:00 PM",
    venue: "Lecture Hall A",
    discipline: "Academics",
    image: seminarSeriesImg,
    registrationLink: "#",
  },
  {
    id: 5,
    title: "Robotics Workshop",
    date: "April 1-2, 2025",
    time: "10:00 AM",
    venue: "Engineering Lab",
    discipline: "Robotics",
    image: roboticsWorkshopImg,
    registrationLink: "#",
  },
  {
    id: 6,
    title: "Fashion Show",
    date: "April 8, 2025",
    time: "6:00 PM",
    venue: "Convention Center",
    discipline: "Fashion",
    image: fashionShowImg,
    registrationLink: "#",
  },
  {
    id: 7,
    title: "Management Summit",
    date: "April 12-13, 2025",
    time: "9:00 AM",
    venue: "Business Block",
    discipline: "Management",
    image: managementSummitImg,
    registrationLink: "#",
  },
  {
    id: 8,
    title: "Art Exhibition",
    date: "April 15-20, 2025",
    time: "All Day",
    venue: "Art Gallery",
    discipline: "Fine Arts",
    image: artExhibitionImg,
    registrationLink: "#",
  },
  {
    id: 9,
    title: "Electrical Workshop",
    date: "April 22, 2025",
    time: "10:00 AM",
    venue: "EE Lab",
    discipline: "Electrical Engineering",
    image: electricalWorkshopImg,
    registrationLink: "#",
  },
  {
    id: 10,
    title: "Music Concert",
    date: "April 28, 2025",
    time: "7:00 PM",
    venue: "Main Stage",
    discipline: "Music",
    image: musicConcertImg,
    registrationLink: "#",
  },
];

export function EventsCarousel() {
  const [currentIndex, setCurrentIndex] = useState(0);

  const nextSlide = () => {
    setCurrentIndex((prev) => (prev + 1) % events.length);
  };

  const prevSlide = () => {
    setCurrentIndex((prev) => (prev - 1 + events.length) % events.length);
  };

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "ArrowLeft") {
        prevSlide();
      } else if (e.key === "ArrowRight") {
        nextSlide();
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  useEffect(() => {
    const handleWheel = (e: WheelEvent) => {
      if (e.deltaY > 0) {
        nextSlide();
      } else if (e.deltaY < 0) {
        prevSlide();
      }
    };

    const carousel = document.getElementById("events-carousel");
    carousel?.addEventListener("wheel", handleWheel, { passive: true });
    return () => carousel?.removeEventListener("wheel", handleWheel);
  }, []);

  const currentEvent = events[currentIndex];

  return (
    <div id="events-carousel" className="relative w-full h-full">
      <div className="relative w-full h-[600px] rounded-2xl overflow-hidden group">
        <img
          src={currentEvent.image}
          alt={currentEvent.title}
          className="absolute inset-0 w-full h-full object-cover transition-transform duration-500"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-card/95 via-card/50 to-transparent" />
        
        <div className="absolute bottom-0 left-0 right-0 p-8 text-foreground">
          <Badge className="mb-3 bg-primary text-primary-foreground">
            {currentEvent.discipline}
          </Badge>
          <h3 className="text-4xl font-bold mb-4">{currentEvent.title}</h3>
          
          <div className="flex flex-wrap gap-4 mb-6">
            <div className="flex items-center gap-2">
              <Calendar className="w-5 h-5 text-primary" />
              <span className="text-sm">{currentEvent.date}</span>
            </div>
            <div className="flex items-center gap-2">
              <Clock className="w-5 h-5 text-accent" />
              <span className="text-sm">{currentEvent.time}</span>
            </div>
            <div className="flex items-center gap-2">
              <MapPin className="w-5 h-5 text-secondary" />
              <span className="text-sm">{currentEvent.venue}</span>
            </div>
          </div>
          
          <Button
            onClick={() => window.open(currentEvent.registrationLink, "_blank")}
            className="bg-gradient-to-r from-primary to-secondary text-primary-foreground hover:opacity-90 transition-opacity"
          >
            Register Now
          </Button>
        </div>

        <div className="absolute left-4 top-1/2 -translate-y-1/2 opacity-0 group-hover:opacity-100 transition-opacity">
          <Button
            variant="outline"
            size="icon"
            onClick={prevSlide}
            className="rounded-full bg-card/80 backdrop-blur-sm"
          >
            <ChevronLeft className="w-6 h-6" />
          </Button>
        </div>

        <div className="absolute right-4 top-1/2 -translate-y-1/2 opacity-0 group-hover:opacity-100 transition-opacity">
          <Button
            variant="outline"
            size="icon"
            onClick={nextSlide}
            className="rounded-full bg-card/80 backdrop-blur-sm"
          >
            <ChevronRight className="w-6 h-6" />
          </Button>
        </div>
      </div>

      <div className="flex justify-center gap-2 mt-6">
        {events.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentIndex(index)}
            className={`w-3 h-3 rounded-full transition-all ${
              index === currentIndex
                ? "bg-primary w-8"
                : "bg-muted hover:bg-muted-foreground"
            }`}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>
    </div>
  );
}
