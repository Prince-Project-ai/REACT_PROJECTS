import React from "react";
import Slider from "react-slick";
import { Github, ExternalLink } from "lucide-react";
import { NavLink } from "react-router-dom";

// Importing images
import todoMain from "../assets/project-imag/todo_main.png";
import todoModel from "../assets/project-imag/todo_model.png";
import cart1 from "../assets/project-imag/cart_1.png";
import cart2 from "../assets/project-imag/cart_2.png";
import onlinePic from "../assets/project-imag/online-pic1.png";
import passGeneLight from "../assets/project-imag/pass-gene-light.png";
import passGeDark from "../assets/project-imag/pass-ge-dark.png";

const Landing = () => {
  const sliderSettings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows: false,
    autoplay: true,
    autoplaySpeed: 3000,
  };

  const projects = [
    {
      name: "To-Do App",
      images: [todoMain, todoModel],
      description: [
        "Interactive task management with add, edit, and delete functionality",
        "Task categorization into To Do, Doing, and Done columns",
        "Local storage for persistent task data",
        "Responsive design with dark/light mode toggle",
      ],
      tags: ["React", "Tailwind CSS", "Local Storage", "Drag & Drop"],
      duration: "2 days",
      githubLink: "#",
      liveLink: "/project/to-do-app",
    },
    {
      name: "Add To Cart",
      images: [cart1, cart2],
      description: [
        "Product listing with add to cart functionality",
        "Shopping cart with quantity adjustment",
        "Responsive design for all screen sizes",
        "State management using React hooks",
      ],
      tags: ["React", "Tailwind CSS", "Context API", "Responsive Design"],
      duration: "3 days",
      githubLink: "#",
      liveLink: "/project/add-to-cart",
    },
    {
      name: "Online Picture Store",
      images: [onlinePic],
      description: [
        "Image search using Unsplash API",
        "Infinite scroll for loading more images",
        "Download functionality for images",
        "Responsive grid layout",
      ],
      tags: ["React", "Unsplash API", "Infinite Scroll", "Responsive Design"],
      duration: "2 days",
      githubLink: "#",
      liveLink: "/project/online-pic-store",
    },
    {
      name: "Password Generator",
      images: [passGeneLight, passGeDark],
      description: [
        "Customizable password generation with length control",
        "Option to include numbers, symbols, and uppercase letters",
        "Copy to clipboard functionality",
        "Dark/light mode toggle",
      ],
      tags: ["React", "Tailwind CSS", "Clipboard API", "Custom Hooks"],
      duration: "1 day",
      githubLink: "#",
      liveLink: "/project/password-generator",
    },
  ];

  return (
    <div className="min-h-screen bg-black text-white">
      <div className="absolute inset-0 bg-grid-slate-200 opacity-10 z-0 pointer-events-none"></div>

      <header className="py-12 text-center relative z-10">
        <h1 className="text-5xl font-bold text-blue-400">React Projects</h1>
      </header>

      <section className="py-12 px-4 relative z-10">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {projects.map((project, index) => (
            <div
              key={index}
              className="bg-dark-gray  rounded-xl shadow-lg overflow-hidden transform transition-all duration-300 hover:shadow-xl border border-white/10"
            >
              <div className="w-full">
                {project.images.length > 1 ? (
                  <Slider {...sliderSettings}>
                    {project.images.map((image, imgIndex) => (
                      <div key={imgIndex}>
                        <img
                          src={image}
                          alt={`${project.name} screenshot ${imgIndex + 1}`}
                          className="w-full h-64 object-cover"
                        />
                      </div>
                    ))}
                  </Slider>
                ) : (
                  <img
                    src={project.images[0]}
                    alt={`${project.name} screenshot`}
                    className="w-full h-64 object-cover"
                  />
                )}
              </div>

              <div className="p-6 bg-dark-gray">
                <h2 className="text-2xl font-semibold text-blue-300 mb-3">
                  {project.name}
                </h2>
                <ul className="text-gray-300 mb-4 list-disc list-inside">
                  {project.description.map((point, pointIndex) => (
                    <li key={pointIndex}>{point}</li>
                  ))}
                </ul>

                <div className="flex flex-wrap gap-2 mb-4">
                  {project.tags.map((tag, tagIndex) => (
                    <span
                      key={tagIndex}
                      className="px-3 py-1 bg-white/20 text-white text-sm font-medium rounded-full"
                    >
                      {tag}
                    </span>
                  ))}
                </div>

                <p className="text-gray-300 mb-4">
                  <span className="font-medium">Duration:</span> {project.duration}
                </p>

                <div className="flex gap-4">
                  <NavLink
                    to={project.githubLink}
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 px-4 py-2 bg-gray-700 text-white rounded-lg hover:bg-gray-600 transition-colors duration-200"
                  >
                    <Github size={18} />
                    GitHub
                  </NavLink>
                  <NavLink
                    to={project.liveLink}
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-500 transition-colors duration-200"
                  >
                    <ExternalLink size={18} />
                    Live Demo
                  </NavLink>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};

export default Landing;