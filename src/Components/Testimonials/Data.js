
const items = [
    {
      name: "Aarav Patel",
      heading: "Efficient Collaborating",
      city: "Mumbai",
      rating: 5,
      review: "I adopted the sweetest puppy from FureverHome. The entire process was seamless, and the staff was incredibly helpful and friendly.",
      image: "https://images.unsplash.com/photo-1492562080023-ab3db95bfbce?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NXx8aW5kaWFuJTIwcGVvcGxlfGVufDB8fDB8fHww&auto=format&fit=crop&w=900&q=60"
    },
    {
      name: "Aditi Sharma",
      heading: "Detailed Descriptions",
      city: "Delhi",
      rating: 4,
      review: "FureverHome made it easy for me to find my new furry friend. The facility is clean, and the animals are well-cared for.",
      image: "https://images.unsplash.com/photo-1607189200597-4d0923ef98c6?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NHx8aW5kaWFuJTIwcGVvcGxlfGVufDB8fDB8fHww&auto=format&fit=crop&w=900&q=60"
    },
    {
      name: "Aryan Singh",
      heading: "Attentive Support",
      city: "Jaipur",
      rating: 4,
      review: "I can't thank FureverHome enough for helping me find the perfect cat for my family. They truly care about matching pets with loving homes.",
      image: "https://media.licdn.com/dms/image/D4E03AQEyfky2s3zfEQ/profile-displayphoto-shrink_800_800/0/1687787697740?e=2147483647&v=beta&t=Pqe9VP3PY8-ZgiuvxYeKNk5ZXRyg-ETViiUjw7adalw"
    },
    {
      name: "Ananya Reddy",
      heading: "Reliable Platform",
      city: "Bangalore",
      rating: 3,
      review: "The adoption process at FureverHome was smooth and quick. My dog has brought so much joy into my life!",
      image: "https://images.unsplash.com/photo-1488426862026-3ee34a7d66df?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTI1fHxpbmRpYW4lMjBwZW9wbGV8ZW58MHx8MHx8fDA%3D&auto=format&fit=crop&w=900&q=60"
    },
    {
      name: "Arjun Gupta",
      heading: "Diverse Selection",
      city: "Kolkata",
      rating: 4,
      review: "I adopted a kitten from FureverHome and was impressed by their dedication to animal welfare. I highly recommend them.",
      image: "https://images.unsplash.com/photo-1559469118-d0269d26e1ad?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTkzfHxpbmRpYW4lMjBwZW9wbGV8ZW58MHx8MHx8fDA%3D&auto=format&fit=crop&w=900&q=60"
    },
    {
      name: "Avni Desai",
      heading: "Convenient Search",
      city: "Ahmedabad",
      rating: 5,
      review: "FureverHome's team went above and beyond to ensure my new pet's transition to my home was smooth. I'm grateful for their support.",
      image: "https://images.unsplash.com/photo-1529626455594-4ff0802cfb7e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTQxfHxpbmRpYW4lMjBwZW9wbGV8ZW58MHx8MHx8fDA%3D&auto=format&fit=crop&w=900&q=60"
    },
    {
      name: "Dev Sharma",
      heading: "User-Friendly",
      city: "Chennai",
      rating: 3,
      review: "I've adopted from FureverHome multiple times, and each experience has been fantastic. They truly prioritize the animals' well-being.",
      image: "https://images.unsplash.com/photo-1604230006726-d288206e60ab?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTc0fHxpbmRpYW4lMjBwZW9wbGV8ZW58MHx8MHx8fDA%3D&auto=format&fit=crop&w=900&q=60"
    },
    {
      name: "Ishita Patel",
      heading: "Secure Transactions",
      city: "Pune",
      rating: 4,
      review: "The team at FureverHome made the adoption process stress-free. They are knowledgeable and caring.",
      image: "https://images.unsplash.com/photo-1652278622938-80f0bfa650f9?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MzU1fHxpbmRpYW4lMjBwZW9wbGV8ZW58MHx8MHx8fDA%3D&auto=format&fit=crop&w=900&q=60"
    },
    {
      name: "Rohan Kumar",
      heading: "Compassionate Care",
      city: "Hyderabad",
      rating: 4,
      review: "Adopting from FureverHome was a wonderful experience. They match pets and owners based on compatibility, leading to happy families.",
      image: "https://images.unsplash.com/photo-1507081323647-4d250478b919?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8ODZ8fGluZGlhbiUyMHBlb3BsZSUyMG1hbGV8ZW58MHx8MHx8fDA%3D&auto=format&fit=crop&w=900&q=60"
    },
    {
      name: "Sanaya Choudhary",
      heading: "Loving Companions",
      city: "Chandigarh",
      rating: 5,
      review: "I adopted a senior dog from FureverHome. The staff provided valuable advice on caring for an older pet, and I'm grateful for their help.",
      image: "https://images.unsplash.com/photo-1624610260135-8b3504b3ea27?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MzEyfHxpbmRpYW4lMjBwZW9wbGV8ZW58MHx8MHx8fDA%3D&auto=format&fit=crop&w=900&q=60"
    },
    {
      name: "Vivan Khanna",
      heading: "User-Friendly",
      city: "Lucknow",
      rating: 4,
      review: "FureverHome's dedication to pet welfare is evident in the happy and healthy animals they have available for adoption.",
      image: "https://images.unsplash.com/photo-1627829667625-187756da0213?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MzIwfHxpbmRpYW4lMjBwZW9wbGV8ZW58MHx8MHx8fDA%3D&auto=format&fit=crop&w=900&q=60"
    },
    {
      name: "Yashvi Verma",
      heading: "Easy returns ",
      city: "Ahmedabad",
      rating: 5,
      review: "The team at FureverHome genuinely cares about the well-being of the animals in their care. I'm thrilled with my new furry friend.",
      image: "https://static.vecteezy.com/system/resources/thumbnails/010/442/664/small/close-up-portrait-of-young-beautiful-indian-or-south-asian-teenage-girl-in-dress-photo.jpg"
    },
    {
      name: "Zoya Gupta",
      heading: "Happy Customers",
      city: "Mumbai",
      rating: 3,
      review: "Adopting from FureverHome was a breeze. The adoption counselors were patient and informative, making the process enjoyable.",
      image: "https://images.unsplash.com/photo-1580471260419-99745668af23?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MzMzfHxpbmRpYW4lMjBwZW9wbGV8ZW58MHx8MHx8fDA%3D&auto=format&fit=crop&w=900&q=60"
    },
    {
      name: "Aarav Sharma",
      heading: "Adorable Designs",
      city: "Delhi",
      rating: 4,
      review: "I adopted a rescue cat from FureverHome, and I'm amazed by the positive impact she's had on my life. Thank you!",
      image: "https://plus.unsplash.com/premium_photo-1682092605397-818fd5621240?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MzF8fGluZGlhbiUyMHBlb3BsZSUyMG1hbGV8ZW58MHx8MHx8fDA%3D&auto=format&fit=crop&w=900&q=60"
    },
    {
      name: "Ishani Patel",
      heading: "Trusted resources",
      city: "Ahmedabad",
      rating: 3,
      review: "FureverHome is a wonderful organization committed to finding loving homes for animals. I'm so grateful for my new furry companion.",
      image: "https://images.unsplash.com/photo-1508341591423-4347099e1f19?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NDF8fGluZGlhbiUyMHBlb3BsZSUyMG1hbGV8ZW58MHx8MHx8fDA%3D&auto=format&fit=crop&w=900&q=60"
    }
      ]
  
    export default items;