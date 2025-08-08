# Instructions for Running the Assignment

The frontend is included in the Docker Compose file located in the project's root directory. To start the entire application, run:

```
docker compose up -d
```

Once running, the application can be accessed at:

```
http://localhost:5173
```

### Running the Frontend Separately

If needed, the frontend can also be run independently using the following commands:

```
pnpm install
pnpm dev
```

Once running, the application can be accessed at:

```
http://localhost:5173
```

Before running `pnpm dev`, ensure the `VITE_TRACTOR_API_URL` environment variable is set to the backend container URL. For example:

```
VITE_TRACTOR_API_URL=http://localhost:3000
```

---

## Work Completed

### General

- Updated `docker-compose.yml` to include the frontend.

### Database

- Changed the `date_time` column to the `timestamp` type to simplify sorting and improve usability.

### Backend

- Added new endpoints and modified existing ones.
- Integrated Swagger for API documentation, accessible at:

```
http://localhost:3000/api-docs
```

### Frontend

The frontend is built using [Vite](https://vitejs.dev/) and [Vue 3](https://vuejs.org/).

#### Libraries Used

- [Vue Router](https://router.vuejs.org/) – client-side routing
- [OpenLayers](https://openlayers.org/) – map rendering
- [TailwindCSS](https://tailwindcss.com/) with [DaisyUI](https://daisyui.com/) – styling
- [Pinia](https://pinia.vuejs.org/) – state management (not needed and necessary)
- [VeeValidate](https://vee-validate.logaretm.com/v4/guide/) with [Zod](https://zod.dev/) – form validation

#### Part 1

This part follows the provided requirements. It includes three pages:

- A landing page displaying a list of all tractors
- A telemetry page with a paginated table showing data for a specific tractor. Pagination is implemented on the backend.
- An edit page containing a form to update a telemetry log with basic input validation

#### Part 2

For the second part I decided to display tractor tracks on the map for selected day. A playback component allows users to navigate forward and backward through time. To improve performance and prevent rendering overly complex paths, the tracks are simplified using [simplify-js](https://github.com/mourner/simplify-js), and for displaying tractors location only data for the selected day is loaded.

---

## Work Not Completed (But Should Be)

- **Client-Side Caching**: No caching is currently implemented. I should probably have started with a standard library similar to [react-query](https://tanstack.com/query/v4/docs/react/guides/caching).
- **Testing**: Initial test setup was started, but completing the test suite was too time-consuming within the given timeframe.

---

## Final Comments

I liked the first part of the assignment — it's clearly defined, well-structured, and comes with an excellent boilerplate that goes far beyond typical “to-do” style projects. It wasn’t overly complex either, and I believe it's perfectly manageable to complete within the given timeframe (1 day).

The second part is more challenging and would require significantly more time and effort to implement properly.
