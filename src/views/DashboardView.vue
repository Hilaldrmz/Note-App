<script setup>
import { ref, onMounted, watch, inject} from "vue";

onMounted(() => { getNotesFromLocalStorage(); });

const newNote = ref("");
const notes = ref([]);
const showNewNoteItems = ref(false);
const dropdown = ref(false);

function getRandomColor() {
    // Array of possible colors
    var colors = ["purple", "pink", "blue"];
    // Generate a random index to select a color from the array
    var randomIndex = Math.floor(Math.random() * colors.length);

    // Selected color
    var selectedColor = colors[randomIndex];

    // Saturation and lightness values are set as constants
    var saturation = 90;
    var lightness = 85;

    // Return the randomly selected HSL color string
    return "hsl(" + getHueValue(selectedColor) + ", " + saturation + "%, " + lightness + "%)";

    //  // return "hsl(" + Math.random() * 3600 + ", 100%, 75%)";
}
// Helper function to return the appropriate HSL hue value based on the color name
function getHueValue(color) {
    switch (color) {
        case "purple":
            return Math.random() * 40 + 240;
        case "pink":
            return Math.random() * 40 + 320;
        case "blue":
            return Math.random() * 40 + 200;
        default:
            return 0; // Default to 0 if an unknown color is provided
    }
}
const addNote = () => {
    if (newNote.value.length < 1) {
        return showNewNoteItems.value = false;
    }
    notes.value.push({
        id: Math.floor(Math.random() * 100000),
        text: newNote.value,
        date: new Date(),
        backgroundColor: getRandomColor()
    });
    showNewNoteItems.value = false;
    newNote.value = "";
    saveNotesToLocalStorage();
}

function saveNotesToLocalStorage() {
    localStorage.setItem('notes', JSON.stringify(notes.value));
}
const getNotesFromLocalStorage = () => {
    const savedNotes = JSON.parse(localStorage.getItem('notes'));
    if (savedNotes) {
        notes.value = savedNotes.map(note => {
            return {
                ...note,
                date: new Date(note.date)
            };
        });
    };

}

const showModalDetails = ref(false);
const selectedNote = ref(null);

const showNoteDetails = (note) => {
    selectedNote.value = note;
    showModalDetails.value = true;
}
const truncateText = (text) => {
    const maxLength = 60;
    if (text.length <= maxLength) {
        return text;
    } else {
        return text.slice(0, maxLength) + '...';
    }
}

const dynamicHeight = ref('30px');

const adjustHeight = () => {
    const textarea = document.getElementById('note');
    textarea.style.height = 'auto';
    const currentHeight = textarea.scrollHeight;

    if (currentHeight > previousHeight) {
        dynamicHeight.value = currentHeight + 'px';
        previousHeight = currentHeight;
    };
}
watch(newNote, () => {
    adjustHeight();
});

onMounted(() => {
    document.addEventListener('click', onClickOutside);
});
function onClickOutside(event) {
    const noteContainer = document.getElementById('new-note');
    if (noteContainer && !noteContainer.contains(event.target)) {
        showNewNoteItems.value = false;
    }
}

onMounted(() => {
    document.addEventListener('click', onClickOutsideDropdown);
});
function onClickOutsideDropdown(event) {
    const dropdownIcon = document.getElementById('dropdown-icon');
    if (dropdownIcon && !dropdownIcon.contains(event.target)) {
        dropdown.value = false;
    }
}

const updateLocalStorage = (event) => {
    const editedText = event.target.innerText;
    const selectedNoteIndex = notes.value.findIndex(note => note.id === selectedNote.value.id);

    if (selectedNoteIndex !== -1) {
        notes.value[selectedNoteIndex].text = editedText;
        notes.value[selectedNoteIndex].date = new Date();

        saveNotesToLocalStorage();
    };
}


// const searchQuery = ref("");
// const searchQuery = inject('searchQuery');
// console.log(searchQuery);

// const filteredList = computed(() => {
//     if (searchQuery.value === '') {
//         return notes.value;
//     } else {
//         return notes.value.filter(note =>
//             note.text.toLowerCase().includes(searchQuery.value.toLowerCase())
//         );
//     }
// });


</script>



<template>
    <main>

        <!-- Modal 1-->
        <div v-if="showModalDetails" class="overlay" @click="showModalDetails = false">
            <div id="selected-note-modal" class="modal" @click.stop
                :style="{ backgroundColor: selectedNote.backgroundColor }">
                <div class="btn-div">
                    <button class="close-btn" @click="showModalDetails = false">+</button>
                </div>
                <div v-if="selectedNote" class="note-details">
                    <p contenteditable="true" class="main-text" @input="updateLocalStorage"> {{ selectedNote.text }}</p>
                    <p class="date"> {{ selectedNote.date.toLocaleDateString("tr-TR") }}</p>
                </div>
                <div id="wrapper-dropdown" @click="dropdown = !dropdown" cursor="pointer">
                    <fa-icon :icon="['fas', 'ellipsis-vertical']" style="color: #000000;" cursor="pointer"
                        id="dropdown-icon" />

                    <Transition name="fade">
                        <ul id="dropdown" class="dropdown" v-if="dropdown">
                            <li class="item">delete</li>
                        </ul>
                    </Transition>

                </div>
            </div>
        </div>

        <div class="container">
            <header>
                <div class="new-note-container">
                    <div id="new-note">
                        <textarea v-model.trim="newNote" name="note" id="note" cols="30" rows="10"
                            placeholder="take a note..." @keyup.enter="addNote" :style="{ height: dynamicHeight }"
                            @click="showNewNoteItems = true"></textarea>

                        <div v-if="showNewNoteItems" class="new-note-items">
                            <!-- <div role="toolbar"></div> -->
                            <button class="add-note-btn" @click="addNote">Add</button>
                        </div>
                    </div>
                </div>
            </header>
        </div>

        <div class="cards-container">

            <!-- <div v-for="note in filteredList" :key="note.id" class="card" :style="{ backgroundColor: note.backgroundColor }"
                draggable="true" @click="showNoteDetails(note)">
                <p class="main-text"> {{ truncateText(note.text) }}</p>
                <p class="date"> {{ note.date.toLocaleDateString("tr-TR") }}</p>
            </div> -->

            <div v-for="note in notes" :key="note.id" class="card" :style="{ backgroundColor: note.backgroundColor }"
                draggable="true" @click="showNoteDetails(note)">
                <p class="main-text"> {{ truncateText(note.text) }}</p>
                <p class="date"> {{ note.date.toLocaleDateString("tr-TR") }}</p>
            </div>
        </div>
    </main>
</template>

<style lang="scss" scoped>
main {
    @include scrollbar;
    display: flex;
    flex-direction: column;
    margin: 0;
    padding: 0;
    align-content: center;


    .container {
        min-width: 1000px;
        padding: 10px 0 10px 0;
        margin: 0 100px;
        display: flex;
        justify-content: center;

        header {
            display: flex;
            justify-content: space-between;
            align-items: center;

            .new-note-container {
                display: flex;
                justify-content: center;
            }

        }
    }

    .cards-container {
        display: flex;
        flex-wrap: wrap;
        margin: 0 212px;
        // justify-content: center;

        .card {
            width: 225px;
            height: 150px;
            border-radius: 15px;
            display: flex;
            flex-direction: column;
            justify-content: space-between;
            margin-right: 20px;
            margin-bottom: 20px;
            padding: 10px;
            border: 1px solid rgb(51 65 85 / .1);
            box-shadow: $shadow2 ;

            .main-text {
                font-size: 0.9rem;
            }

            .date {
                font-size: 0.7rem;
                font-weight: bold;
            }
        }
    }

    .overlay {
        position: absolute;
        width: 100dvw;
        height: 100dvh;
        background-color: #18191986;
        z-index: 100;
        display: flex;
        align-items: center;
        justify-content: center;
        top: 0;
    }

    #new-note-modal {
        width: 750px;
        background-color: white;
        border-radius: 10px;
        padding: 30px;
        padding-top: 0;
        position: relative;
        display: flex;
        flex-direction: column;
        box-shadow: $shadow2;
        z-index: 2;

        /* align-items: end; */
        .close-btn {
            @include button;
            background-color: $bg-dark;
            color: $text-light;
            margin-top: 10px;
            margin-left: 730px;
            padding: 0;
            transform: rotate(45deg);

        }

        textarea {
            border-radius: 15px;
            margin-top: 10px;
            padding: 10px;
            text-align: center;
        }

        .add-note-btn {
            @include button;
            width: 100%;
            background-color: $bg-dark;
            color: $text-light;
            margin-top: 15px;
            border-radius: 15px;
        }

        .error-msg {
            color: red;
            font-weight: bold;
        }
    }

    .new-note-container {
        width: 600px;
        margin: 32px auto 16px auto;
        position: relative;

        #new-note {
            width: 500px;
            background-color: white;
            border-radius: 10px;
            padding: 0;
            position: relative;
            display: flex;
            flex-direction: column;
            box-shadow: $shadow;
            z-index: 2;

            textarea {
                border-radius: 15px;
                margin-top: 10px;
                padding: 12px 16px 12px 16px;
                border: none;
                height: 30px;
                resize: none;

                &:focus {
                    outline: none;
                }
            }

            .new-note-items {
                display: flex;
                align-items: center;
                flex-direction: row-reverse;
                flex-wrap: wrap-reverse;
                font-size: 12px;
                line-height: 26px;
                margin: 4px 0;
                position: relative;

                .add-note-btn {
                    width: 50px;
                    background-color: $bg-white;
                    color: $text-dark;
                    border-radius: 15px;
                    border: none;
                    padding: 8px 24px;
                }
            }
        }
    }


    #selected-note-modal {
        width: 750px;
        background-color: white;
        border-radius: 10px;
        padding: 30px;
        padding-top: 0;
        position: relative;
        display: flex;
        flex-direction: column;
        box-shadow: $shadow2;
        min-height: 40dvh;
        max-height: 40dvh;
        z-index: 101;

        .btn-div {
            width: 103%;
            margin: 5px 0 5px 0;
            padding: 0;
            display: flex;
            flex-direction: row-reverse;

            .close-btn {
                @include button;
                background-image: none;
                box-shadow: none;
                color: $text-dark;
                padding: 0;
                transform: rotate(45deg);
                &:hover {
                    background-color: transparentize($color: #000000, $amount: 0.95);
                }
            }
        }

        .note-details {
            display: flex;
            flex-direction: column;
            justify-content: space-between;
            min-height: 35dvh;
            .main-text {
                overflow: auto;

                &:focus {
                    outline: none;
                }
            }

            .date {
                display: flex;
                justify-content: end;
                font-size: small;
            }


        }
    }

    #wrapper-dropdown {
        display: flex;
        justify-content: center;
        padding: 10px;
        width: 20px;
        height: 20px;
        border-radius: 100%;
        cursor: pointer;

            &:hover {
                background-color: transparentize($color: #000000, $amount: 0.95);
            }

        &::before {
            position: absolute;
            top: 50%;
            right: 16px;
            margin-top: -2px;
            border-width: 6px 6px 0 6px;
            border-style: solid;
            border-color: #fff transparent;
        }

        .dropdown {
            transition: 0.3s;
            position: absolute;
            top: 95%;
            right: 0;
            left: 0;
            margin: 0;
            padding: 0;
            list-style: none;
            z-index: 103;
            border-radius: 15px;
            box-shadow: inherit;

            transform-origin: top;
            user-select: none;
            width: max-content;

            li {
                padding: 0 15px;
                line-height: 45px;
                overflow: hidden;
                background-color: $bg-white;
                border-radius: 10px;

                &:last-child {
                    border-bottom: none;
                }

                &:hover {
                    background-color: lightgray;
                }
            }

            &.active {
                opacity: 1;
                visibility: visible;
                border-radius: 15px;
            }
        }

        .dropdown {
            padding: 0.5rem !important;
        }
    }

    .fade-enter-active,
    .fade-leave-active {
        transition: opacity 0.5s ease;
    }
    .fade-enter-from,
    .fade-leave-to {
        opacity: 0;
    }


}
</style>