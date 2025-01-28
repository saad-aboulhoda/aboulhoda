addEventListener("scroll", () => {
  if (window.scrollY > 50) {
    document.querySelector("header").classList.add("active");
  } else {
    document.querySelector("header").classList.remove("active");
  }
});

document.querySelectorAll("[toggle-target]").forEach((element) => {
  element.addEventListener("click", () => {
    const targetId = element.getAttribute("toggle-target");
    const target = document.querySelector(targetId);
    target.classList.toggle(target.getAttribute("toggle-style"));
  });
});

// Message
const messagesContainer = document.querySelector("#messagesContainer");

function showMessage(message) {
  const messageElement = document.createElement("div");
  messageElement.classList.add("message");
  messageElement.textContent = message;

  messagesContainer.append(messageElement);
  messageElement.classList.add("slide-in");

  setTimeout(() => {
    messageElement.classList.add("slide-out");
    setTimeout(() => {
      messagesContainer.removeChild(messageElement);
    }, 700);
  }, 3000);
}

// Handling Contact Us Form

const form = document.querySelector("#contact-form");

async function handleSubmit(event) {
  event.preventDefault();

  const data = new FormData(event.target);
  const url = event.target.action;

  const submitButton = form.querySelector('[type="submit"]');

  try {
    submitButton.setAttribute("disabled", "true");
    const response = await fetch(url, {
      method: form.method,
      body: data,
      headers: {
        Accept: "Application/Json",
      },
    });
    let message = "";

    if (response.ok) {
      message = "Your message was sent successfully!";
      form.reset();
    } else {
      message = "Something went wrong!";
    }

    showMessage(message);
  } catch (error) {
    console.log(error);

    showMessage("Something went wrong!");
  } finally {
    submitButton.removeAttribute("disabled");
  }
}

form.addEventListener("submit", handleSubmit);
