<script setup>
import { ref } from 'vue';

const books = ref([
  {
    id: 1,
    image:
      'http://books.google.com/books/content?id=fQitAAAAQBAJ&printsec=frontcover&img=1&zoom=1&edge=curl&source=gbs_api',
    title: 'Delitto e Castigo',
    author: 'Fëdor Dostoevskij',
    description:
      'Il primo libro che ho mai letto di Fëdor Dostoevskij, un capolavoro della letteratura russa.',
  },
  {
    id: 2,
    image: 'path/to/book2.jpg',
    title: 'Book Title 2',
    author: 'Author 2',
    description: 'Brief description of book 2',
  },
  {
    id: 3,
    image: 'path/to/book3.jpg',
    title: 'Book Title 3',
    author: 'Author 3',
    description: 'Brief description of book 3',
  },
  {
    id: 4,
    image: 'path/to/book4.jpg',
    title: 'Book Title 4',
    author: 'Author 4',
    description: 'Brief description of book 4',
  },
  {
    id: 5,
    image: 'path/to/book5.jpg',
    title: 'Book Title 5',
    author: 'Author 5',
    description: 'Brief description of book 5',
  },
]);
</script>

<template>
  <div
    class="bg-gray-100 min-h-screen flex flex-col items-center justify-center px-5"
  >
    <h1 class="text-6xl font-thin mb-8 text-center">Has George Read?</h1>
    <div class="w-full max-w-md mb-8">
      <input
        type="text"
        placeholder="Search..."
        class="w-full p-4 text-lg border border-gray-300 rounded-lg shadow-sm"
      />
    </div>
  </div>

  <div
    class="bg-gray-100 min-h-screen flex flex-col items-center justify-start gap-10 px-5"
  >
    <h1 class="text-2xl font-semibold">Last books read by George</h1>

    <div class="w-full max-w-2xl">
      <div
        v-for="book in books"
        :key="book.id"
        class="flex items-center bg-white p-4 mb-4 rounded-lg shadow-md"
      >
        <img :src="book.image" alt="Book cover" class="w-24 h-36 mr-4" />
        <div>
          <h2 class="text-xl font-semibold">{{ book.title }}</h2>
          <p class="text-gray-600">{{ book.author }}</p>
          <p class="text-gray-700">{{ book.description }}</p>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.container {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  min-height: 100vh;
  background-color: #f5f5f5;
}

.title {
  font-size: 6rem;
  font-weight: 300;
  margin-bottom: 2rem;
}

.search-bar {
  width: 100%;
  max-width: 28rem;
  margin-bottom: 2rem;
}

.search-bar input {
  width: 100%;
  padding: 1rem;
  font-size: 1.125rem;
  border: 1px solid #d1d5db;
  border-radius: 0.5rem;
  box-shadow: 0 1px 2px rgba(0, 0, 0, 0.05);
}

.book-list {
  width: 100%;
  max-width: 56rem;
}

.book {
  display: flex;
  align-items: center;
  background-color: #fff;
  padding: 1rem;
  margin-bottom: 1rem;
  border-radius: 0.5rem;
  box-shadow: 0 1px 2px rgba(0, 0, 0, 0.05);
}

.book img {
  width: 6rem;
  height: 9rem;
  margin-right: 1rem;
}

.book-info {
  text-align: left;
}

.book-info h2 {
  margin: 0;
  font-size: 1.25rem;
}

.book-info p {
  margin: 0.25rem 0;
}
</style>
