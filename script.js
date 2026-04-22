let jobs = JSON.parse(localStorage.getItem("jobs")) || [];

function postJob() {
  const title = document.getElementById("title").value;
  const location = document.getElementById("location").value;
  const description = document.getElementById("description").value;

  if (!title || !location || !description) {
    alert("Please fill all fields");
    return;
  }

  const job = {
    id: Date.now(),
    title,
    location,
    description,
    accepted: false
  };

  jobs.push(job);
  localStorage.setItem("jobs", JSON.stringify(jobs));

  displayJobs();
  clearForm();
}

function displayJobs() {
  const jobList = document.getElementById("jobList");
  jobList.innerHTML = "";

  jobs.forEach(job => {
    const div = document.createElement("div");
    div.className = "job-card";

    div.innerHTML = `
      <h3>${job.title}</h3>
      <p><strong>Location:</strong> ${job.location}</p>
      <p>${job.description}</p>
      <p>Status: ${job.accepted ? "✅ Accepted" : "⏳ Open"}</p>
      ${
        !job.accepted
          ? `<button class="accept-btn" onclick="acceptJob(${job.id})">Accept Job</button>`
          : ""
      }
    `;

    jobList.appendChild(div);
  });
}

function acceptJob(id) {
  jobs = jobs.map(job =>
    job.id === id ? { ...job, accepted: true } : job
  );

  localStorage.setItem("jobs", JSON.stringify(jobs));
  displayJobs();
}

function clearForm() {
  document.getElementById("title").value = "";
  document.getElementById("location").value = "";
  document.getElementById("description").value = "";
}

displayJobs();
