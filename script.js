const supabaseUrl = "https://fhkicsswuvxbuystdbvd.supabase.co";
const supabaseKey = "YOUR_ANON_KEY";

// create client ONCE
const supabase = window.supabase.createClient(supabaseUrl, supabaseKey);

const form = document.getElementById("contactForm");
const status = document.getElementById("formStatus");

form.addEventListener("submit", async (e) => {
  e.preventDefault(); 

  const name = document.getElementById("name").value.trim();
  const email = document.getElementById("email").value.trim();
  const message = document.getElementById("message").value.trim();

  if (!name || !email || !message) {
    status.textContent = "❌ Please fill in all fields.";
    status.style.color = "red";
    return;
  }

  status.textContent = "⏳ Sending...";
  status.style.color = "gray";

  const { error } = await supabase
    .from("messages")
    .insert([{ name, email, message }]);

  if (error) {
    console.error(error);
    status.textContent = "❌ Failed to send message.";
    status.style.color = "red";
  } else {
    status.textContent = "✅ Message sent successfully!";
    status.style.color = "green";
    form.reset();
  }
});