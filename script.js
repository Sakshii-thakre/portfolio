// Tab switching functionality
function showSection(sectionId) {
  // Hide all sections
  const sections = document.querySelectorAll(".content-section");
  sections.forEach((section) => {
    section.classList.remove("active");
  });

  // Remove active class from all tabs
  const tabs = document.querySelectorAll(".nav-tab");
  tabs.forEach((tab) => {
    tab.classList.remove("active");
  });

  // Show selected section
  document.getElementById(sectionId).classList.add("active");

  // Add active class to clicked tab
  event.target.classList.add("active");
}

// Download resume functionality
function downloadResume() {
  const drivePdfUrl = "https://drive.google.com/file/d/1511QM4xZTfjYMnfkTMJGXoJhkj2h5h5T/view?usp=sharing"; // Replace with your actual Drive link

  // Open the PDF in a new tab
  window.open(drivePdfUrl, "_blank");

  // Optional: Show success notification (if you have a notification system)
  if (typeof showNotification === "function") {
    showNotification("Opening resume PDF...", "info");
  }
}

// Open external links
function openLink(url) {
  window.open(url, "_blank");
}

// Handle form submission
function handleSubmit(event) {
  event.preventDefault();

  const formData = new FormData(event.target);
  const submitBtn = event.target.querySelector(".submit-btn");
  const originalContent = submitBtn.innerHTML;

  // Show loading state
  submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i>Sending...';
  submitBtn.disabled = true;

  // Simulate form submission
  setTimeout(() => {
    submitBtn.innerHTML = originalContent;
    submitBtn.disabled = false;
    showNotification(
      "Message sent successfully! I'll get back to you soon.",
      "success"
    );
    event.target.reset();
  }, 2000);
}

// Notification system
function showNotification(message, type = "info") {
  // Remove existing notifications
  const existingNotifications = document.querySelectorAll(".notification");
  existingNotifications.forEach((notif) => notif.remove());

  const notification = document.createElement("div");
  notification.className = `notification notification-${type}`;
  notification.style.cssText = `
                position: fixed;
                top: 20px;
                right: 20px;
                padding: 15px 20px;
                border-radius: 8px;
                color: white;
                font-weight: 500;
                z-index: 1000;
                min-width: 300px;
                box-shadow: 0 10px 25px rgba(0, 0, 0, 0.3);
                animation: slideInRight 0.3s ease-out;
                display: flex;
                align-items: center;
                justify-content: space-between;
                gap: 10px;
            `;

  if (type === "success") {
    notification.style.background = "linear-gradient(135deg, #22c55e, #16a34a)";
  } else if (type === "error") {
    notification.style.background = "linear-gradient(135deg, #ef4444, #dc2626)";
  } else {
    notification.style.background = "linear-gradient(135deg, #3b82f6, #1d4ed8)";
  }

  notification.innerHTML = `
                <span>${message}</span>
                <button onclick="this.parentElement.remove()" style="background: none; border: none; color: white; cursor: pointer; padding: 2px;">
                    <i class="fas fa-times"></i>
                </button>
            `;

  // Add CSS animation
  const style = document.createElement("style");
  style.textContent = `
                @keyframes slideInRight {
                    from { transform: translateX(100%); opacity: 0; }
                    to { transform: translateX(0); opacity: 1; }
                }
                @keyframes spin {
                    from { transform: rotate(0deg); }
                    to { transform: rotate(360deg); }
                }
                .fa-spin {
                    animation: spin 1s linear infinite;
                }
            `;
  if (!document.querySelector("#notification-styles")) {
    style.id = "notification-styles";
    document.head.appendChild(style);
  }

  document.body.appendChild(notification);

  // Auto remove after 5 seconds
  setTimeout(() => {
    if (notification.parentElement) {
      notification.style.animation = "slideInRight 0.3s ease-out reverse";
      setTimeout(() => notification.remove(), 300);
    }
  }, 5000);
}

// Add some interactive effects
document.addEventListener("DOMContentLoaded", function () {
  // Add hover effects to skill items
  const skillItems = document.querySelectorAll(".skill-item");
  skillItems.forEach((item) => {
    item.addEventListener("mouseenter", function () {
      this.style.transform = "translateY(-5px) scale(1.05)";
    });
    item.addEventListener("mouseleave", function () {
      this.style.transform = "translateY(0) scale(1)";
    });
  });

  // Add click effects to project cards
  const projectCards = document.querySelectorAll(".project-card");
  projectCards.forEach((card) => {
    card.addEventListener("click", function () {
      this.style.transform = "scale(0.98)";
      setTimeout(() => {
        this.style.transform = "scale(1)";
      }, 150);
    });
  });

  // Add typing effect to section titles
  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.style.animation = "fadeIn 0.8s ease-out";
      }
    });
  });

  const animatedElements = document.querySelectorAll(
    ".section-title, .project-card, .skill-item, .experience-item"
  );
  animatedElements.forEach((el) => observer.observe(el));
});

// Add smooth scrolling to content sections
document.querySelectorAll(".content-section").forEach((section) => {
  section.style.scrollBehavior = "smooth";
});

// Keyboard navigation
document.addEventListener("keydown", function (e) {
  if (e.altKey) {
    const tabs = ["about", "resume", "projects", "contact"];
    const currentTab = document.querySelector(".nav-tab.active");
    const currentIndex = Array.from(
      document.querySelectorAll(".nav-tab")
    ).indexOf(currentTab);

    if (e.key === "ArrowRight" && currentIndex < tabs.length - 1) {
      e.preventDefault();
      document.querySelectorAll(".nav-tab")[currentIndex + 1].click();
    } else if (e.key === "ArrowLeft" && currentIndex > 0) {
      e.preventDefault();
      document.querySelectorAll(".nav-tab")[currentIndex - 1].click();
    }
  }
});

// Add some particle effects to the background
function createParticles() {
  const container = document.querySelector(".container");
  const particleCount = 15;

  for (let i = 0; i < particleCount; i++) {
    const particle = document.createElement("div");
    particle.style.cssText = `
                    position: absolute;
                    width: 2px;
                    height: 2px;
                    background: rgba(59, 130, 246, 0.3);
                    border-radius: 50%;
                    pointer-events: none;
                    animation: float ${
                      3 + Math.random() * 4
                    }s ease-in-out infinite;
                    animation-delay: ${Math.random() * 2}s;
                    left: ${Math.random() * 100}%;
                    top: ${Math.random() * 100}%;
                `;

    container.appendChild(particle);
  }

  // Add floating animation if not exists
  if (!document.querySelector("#particle-styles")) {
    const style = document.createElement("style");
    style.id = "particle-styles";
    style.textContent = `
                    @keyframes float {
                        0%, 100% { transform: translateY(0px) translateX(0px); opacity: 0.3; }
                        25% { transform: translateY(-20px) translateX(10px); opacity: 0.6; }
                        50% { transform: translateY(-10px) translateX(-5px); opacity: 0.8; }
                        75% { transform: translateY(-30px) translateX(15px); opacity: 0.4; }
                    }
                `;
    document.head.appendChild(style);
  }
}

// Initialize particles after page load
setTimeout(createParticles, 1000);
