const contributors = [
  {
    name: "Santana",
    imageUrl:
      "https://res.cloudinary.com/desq1cdmo/image/upload/c_crop,ar_1:1/v1741688759/Santana_r4sit0.jpg", // Ganti dengan URL ImgBB
    description: "Male vokal dan leat gitar",
  },
  {
    name: "Rizky Nur Fajri",
    imageUrl:
      "https://res.cloudinary.com/desq1cdmo/image/upload/c_crop,ar_1:1/v1741689447/Rizky_Nur_Fajri_mveds0.jpg", // Ganti dengan URL ImgBB
    description: "Vokal Female",
  },
  {
    name: "Rosdiana",
    imageUrl:
      "https://res.cloudinary.com/desq1cdmo/image/upload/c_crop,ar_1:1/v1741688759/Rosdiana_juzou4.jpg", // Ganti dengan URL ImgBB
    description: "Violinnist",
  },
  {
    name: "Akew",
    imageUrl:
      "https://res.cloudinary.com/desq1cdmo/image/upload/c_crop,w_960,h_960,ar_1:1,g_auto/v1741688758/Akew_el6ao3.jpg", // Ganti dengan URL ImgBB
    description: "Guitar rhythm",
  },
  {
    name: "Dimas",
    imageUrl:
      "https://res.cloudinary.com/desq1cdmo/image/upload/c_crop,ar_1:1/v1741688757/Dimas_n6nr3d.jpg", // Ganti dengan URL ImgBB
    description: "Cellist",
  },
  {
    name: "Maranatha",
    imageUrl:
      "https://res.cloudinary.com/desq1cdmo/image/upload/c_crop,ar_1:1/v1741688757/Maranatha_kcdhxm.jpg", // Ganti dengan URL ImgBB
    description: "Cak player",
  },
  {
    name: "Immanuel",
    imageUrl:
      "https://res.cloudinary.com/desq1cdmo/image/upload/c_crop,ar_1:1/v1741688757/Immanuel_ayaxrq.jpg", // Ganti dengan URL ImgBB
    description: "Cuk player",
  },
  {
    name: "Marshal",
    imageUrl:
      "https://res.cloudinary.com/desq1cdmo/image/upload/c_crop,ar_1:1/v1741689447/Marshal_c6aovo.jpg", // Ganti dengan URL ImgBB
    description: "Bassist",
  },
];

function displayContributors() {
  const contributorsContainer = document.getElementById("contributors");

  contributors.forEach((contributor) => {
    const card = document.createElement("div");
    card.className = "contributor-card";

    // Profile image
    const img = document.createElement("img");
    img.src = contributor.imageUrl;
    img.alt = contributor.name;

    // Error handling untuk gambar
    img.onerror = () => {
      img.src = "../images/default-avatar.png"; // Gambar default jika gagal load
    };

    // Nama kontributor
    const name = document.createElement("h3");
    name.textContent = contributor.name;

    // Deskripsi kontributor
    const description = document.createElement("p");
    description.className = "contributor-description";
    description.textContent = contributor.description;

    card.appendChild(img);
    card.appendChild(name);
    card.appendChild(description);
    contributorsContainer.appendChild(card);
  });
}

displayContributors();
