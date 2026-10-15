

const menuBtn =
    document.getElementById("menuBtn");

const navLinks =
    document.querySelector(".nav-links");


if (menuBtn && navLinks) {

    menuBtn.addEventListener(
        "click",
        function () {

            navLinks.classList.toggle("active");

        }
    );

}


// Close mobile menu after clicking a link

const navItems =
    document.querySelectorAll(".nav-links a");


navItems.forEach(
    function (link) {

        link.addEventListener(
            "click",
            function () {

                navLinks.classList.remove(
                    "active"
                );

            }
        );

    }
);



// ======================================================
// 2. TREK SEARCH
// ======================================================

const searchTrek =
    document.getElementById("searchTrek");


const trekCards =
    document.querySelectorAll(".trek-card");


if (searchTrek) {

    searchTrek.addEventListener(
        "input",
        function () {

            const searchValue =
                searchTrek.value
                    .toLowerCase()
                    .trim();


            trekCards.forEach(
                function (card) {

                    const trekName =
                        card.dataset.name
                            .toLowerCase();


                    if (
                        trekName.includes(
                            searchValue
                        )
                    ) {

                        card.style.display =
                            "block";

                    }

                    else {

                        card.style.display =
                            "none";

                    }

                }
            );

        }
    );

}



// ======================================================
// 3. FIND YOUR TREK
// ======================================================

const findTrekBtn =
    document.getElementById("findTrekBtn");


if (findTrekBtn) {

    findTrekBtn.addEventListener(
        "click",
        function () {

            const trekChoice =
                prompt(
                    "What type of trek do you prefer?\n\n" +
                    "Type: Easy, Moderate or Difficult"
                );


            if (!trekChoice) {

                return;

            }


            const choice =
                trekChoice
                    .toLowerCase()
                    .trim();


            let foundTrek = false;


            trekCards.forEach(
                function (card) {

                    const difficulty =
                        card.dataset.difficulty
                            .toLowerCase();


                    if (
                        difficulty === choice
                    ) {

                        card.style.display =
                            "block";

                        foundTrek = true;

                    }

                    else {

                        card.style.display =
                            "none";

                    }

                }
            );


            if (foundTrek) {

                document
                    .getElementById("treks")
                    .scrollIntoView({
                        behavior: "smooth"
                    });


                showMessage(
                    "🎯 We found a " +
                    choice +
                    " trek for you!"
                );

            }

            else {

                alert(
                    "Please choose Easy, Moderate or Difficult."
                );


                trekCards.forEach(
                    function (card) {

                        card.style.display =
                            "block";

                    }
                );

            }

        }
    );

}



// ======================================================
// 4. BOOKING MODAL
// ======================================================

const bookingModal =
    document.getElementById(
        "bookingModal"
    );


const closeBooking =
    document.getElementById(
        "closeBooking"
    );


const bookingForm =
    document.getElementById(
        "bookingForm"
    );


const bookButtons =
    document.querySelectorAll(
        ".book-btn"
    );


// Open booking form

bookButtons.forEach(
    function (button) {

        button.addEventListener(
            "click",
            function () {

                const card =
                    button.closest(
                        ".trek-card"
                    );


                if (!card) {

                    return;

                }


                const trekName =
                    card.querySelector(
                        "h3"
                    ).textContent;


                document.getElementById(
                    "bookingTrek"
                ).value = trekName;


                bookingModal.classList.add(
                    "active"
                );

            }
        );

    }
);


// Close booking form

if (closeBooking) {

    closeBooking.addEventListener(
        "click",
        function () {

            bookingModal.classList.remove(
                "active"
            );

        }
    );

}


// Close when clicking outside

if (bookingModal) {

    bookingModal.addEventListener(
        "click",
        function (event) {

            if (
                event.target ===
                bookingModal
            ) {

                bookingModal.classList.remove(
                    "active"
                );

            }

        }
    );

}


// Submit booking

if (bookingForm) {

    bookingForm.addEventListener(
        "submit",
        function (event) {

            // Stop page refresh
            event.preventDefault();


            // Get values

            const name =
                document.getElementById(
                    "bookingName"
                ).value.trim();


            const mobile =
                document.getElementById(
                    "bookingMobile"
                ).value.trim();


            const people =
                document.getElementById(
                    "bookingPeople"
                ).value;


            const trek =
                document.getElementById(
                    "bookingTrek"
                ).value;


            // Create booking object

            const booking = {

                name: name,

                mobile: mobile,

                people: people,

                trek: trek,

                bookingDate:
                    new Date()
                        .toLocaleDateString()

            };


            // Get previous bookings

            let bookings =
                JSON.parse(
                    localStorage.getItem(
                        "exploreWithUsBookings"
                    )
                ) || [];


            // Add new booking

            bookings.push(
                booking
            );


            // Save bookings

            localStorage.setItem(
                "exploreWithUsBookings",
                JSON.stringify(bookings)
            );


            // Close modal

            bookingModal.classList.remove(
                "active"
            );


            // Reset form

            bookingForm.reset();


            // Success message

            showMessage(
                "🎉 Your " +
                trek +
                " booking was successful!"
            );

        }
    );

}



// ======================================================
// 5. FORT DETAILS
// ======================================================

const detailButtons =
    document.querySelectorAll(
        ".details-btn"
    );


detailButtons.forEach(
    function (button) {

        button.addEventListener(
            "click",
            function () {

                const card =
                    button.closest(
                        ".fort-card"
                    );


                if (!card) {

                    return;

                }


                const fortName =
                    card.querySelector(
                        "h3"
                    ).textContent;


                let message = "";


                if (
                    fortName.includes(
                        "Rajgad"
                    )
                ) {

                    message =
                        "🏰 Rajgad Fort\n\n" +
                        "📍 Location: Pune district\n" +
                        "🥾 Difficulty: Moderate\n" +
                        "🌅 Best for: Sunrise trekking\n\n" +
                        "Rajgad is one of Maharashtra's famous historic forts and offers beautiful mountain views.";

                }


                else if (
                    fortName.includes(
                        "Sinhagad"
                    )
                ) {

                    message =
                        "🏰 Sinhagad Fort\n\n" +
                        "📍 Location: Near Pune\n" +
                        "🥾 Difficulty: Easy\n" +
                        "🌄 Best for: Beginners and short treks\n\n" +
                        "Sinhagad is one of the most popular trekking destinations near Pune.";

                }


                else if (
                    fortName.includes(
                        "Torna"
                    )
                ) {

                    message =
                        "🏰 Torna Fort\n\n" +
                        "📍 Location: Pune district\n" +
                        "🥾 Difficulty: Difficult\n" +
                        "⛰️ Best for: Experienced trekkers\n\n" +
                        "Torna is also known as Prachandagad and is a popular challenging trek.";

                }


                alert(message);

            }
        );

    }
);



// ======================================================
// 6. FAVORITE TREKS
// ======================================================

trekCards.forEach(
    function (card) {

        // Create favorite button

        const favoriteButton =
            document.createElement(
                "button"
            );


        favoriteButton.className =
            "favorite-btn";


        favoriteButton.type =
            "button";


        favoriteButton.textContent =
            "♡";


        // Add to card

        card.appendChild(
            favoriteButton
        );


        // Get trek name

        const trekName =
            card.querySelector(
                "h3"
            ).textContent;


        // Get saved favorites

        let favorites =
            JSON.parse(
                localStorage.getItem(
                    "exploreWithUsFavorites"
                )
            ) || [];


        // Check existing favorite

        if (
            favorites.includes(
                trekName
            )
        ) {

            favoriteButton.textContent =
                "♥";

        }


        // Click favorite

        favoriteButton.addEventListener(
            "click",
            function (event) {

                event.stopPropagation();


                let currentFavorites =
                    JSON.parse(
                        localStorage.getItem(
                            "exploreWithUsFavorites"
                        )
                    ) || [];


                if (
                    currentFavorites.includes(
                        trekName
                    )
                ) {

                    // Remove

                    currentFavorites =
                        currentFavorites.filter(
                            function (item) {

                                return (
                                    item !==
                                    trekName
                                );

                            }
                        );


                    favoriteButton.textContent =
                        "♡";


                    showMessage(
                        "Removed from favorites."
                    );

                }

                else {

                    // Add

                    currentFavorites.push(
                        trekName
                    );


                    favoriteButton.textContent =
                        "♥";


                    showMessage(
                        "❤️ Added to favorites!"
                    );

                }


                // Save

                localStorage.setItem(
                    "exploreWithUsFavorites",
                    JSON.stringify(
                        currentFavorites
                    )
                );

            }
        );

    }
);



// ======================================================
// 7. WHATSAPP COMMUNITY
// ======================================================

const whatsappBtn =
    document.getElementById(
        "whatsappBtn"
    );


if (whatsappBtn) {

    whatsappBtn.addEventListener(
        "click",
        function () {

            console.log(
                "Opening ExploreWithUs WhatsApp Community..."
            );

        }
    );

}



// ======================================================
// 8. NOTIFICATION FUNCTION
// ======================================================

function showMessage(message) {

    // Create notification

    const notification =
        document.createElement(
            "div"
        );


    // Add class

    notification.className =
        "notification";


    // Add message

    notification.textContent =
        message;


    // Add to page

    document.body.appendChild(
        notification
    );


    // Remove after 3 seconds

    setTimeout(
        function () {

            notification.remove();

        },
        3000
    );

}



// ======================================================
// 9. ESC KEY CLOSES BOOKING MODAL
// ======================================================

document.addEventListener(
    "keydown",
    function (event) {

        if (
            event.key === "Escape" &&
            bookingModal.classList.contains(
                "active"
            )
        ) {

            bookingModal.classList.remove(
                "active"
            );

        }

    }
);



// ======================================================
// 10. SHOW SAVED DATA IN CONSOLE
// ======================================================

const savedBookings =
    JSON.parse(
        localStorage.getItem(
            "exploreWithUsBookings"
        )
    ) || [];


const savedFavorites =
    JSON.parse(
        localStorage.getItem(
            "exploreWithUsFavorites"
        )
    ) || [];


console.log(
    "ExploreWithUs Bookings:",
    savedBookings
);


console.log(
    "ExploreWithUs Favorites:",
    savedFavorites
);


console.log(
    "🌄 Welcome to ExploreWithUs!"
);


console.log(
    "Explore. Trek. Discover."
);

