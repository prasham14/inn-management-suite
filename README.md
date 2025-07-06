
# 🏨 Hotel Admin Dashboard

A beautiful and fully functional hotel administration dashboard built with React, TypeScript, and Tailwind CSS. This system allows hotel administrators to manage multiple hotels and their menus with an intuitive, modern interface.

## ✨ Features

### 🔐 Authentication
- Secure admin login with fixed credentials
- Session persistence with localStorage
- Clean and professional login interface

### 🏨 Hotel Management
- Add, edit, and delete hotel properties
- Store hotel details (name, location, description)
- Real-time statistics and overview cards
- Responsive grid layout for hotel cards

### 🍽️ Menu Management
- Create comprehensive menus for each hotel
- Organize items into categories (Starters, Main Course, Beverages, etc.)
- Add detailed menu items with:
  - Name and description
  - Pricing
  - Optional image URLs
- Full CRUD operations (Create, Read, Update, Delete)
- Intuitive category and item management

### 💅 Modern UI/UX
- Clean, professional design with gradient backgrounds
- Fully responsive layout for mobile and desktop
- Smooth animations and transitions
- Modern component library (shadcn/ui)
- Consistent color scheme and typography

## 🚀 Quick Start

### Prerequisites
- Node.js (version 16 or higher)
- npm or yarn package manager

### Installation

1. **Clone the repository:**
   ```bash
   git clone <your-repo-url>
   cd hotel-admin-dashboard
   ```

2. **Install dependencies:**
   ```bash
   npm install
   # or
   yarn install
   ```

3. **Start the development server:**
   ```bash
   npm run dev
   # or
   yarn dev
   ```

4. **Open your browser:**
   Navigate to `http://localhost:8080` to view the application.

## 🔑 Default Login Credentials

- **Username:** `admin`
- **Password:** `hotel123`

> **Note:** In a production environment, these credentials should be stored securely in environment variables and hashed in a database.

## 📁 Project Structure

```
src/
├── components/
│   ├── auth/
│   │   └── LoginForm.tsx          # Authentication component
│   ├── dashboard/
│   │   ├── Dashboard.tsx          # Main dashboard layout
│   │   ├── HotelManagement.tsx    # Hotel CRUD operations
│   │   └── MenuManagement.tsx     # Menu CRUD operations
│   └── ui/                        # shadcn/ui components
├── pages/
│   ├── Index.tsx                  # Main application entry
│   └── NotFound.tsx              # 404 error page
├── hooks/                         # Custom React hooks
├── lib/                           # Utility functions
└── index.css                      # Global styles and animations
```

## 🛠️ Technologies Used

- **Frontend Framework:** React 18 with TypeScript
- **Build Tool:** Vite
- **Styling:** Tailwind CSS
- **UI Components:** shadcn/ui
- **Icons:** Lucide React
- **State Management:** React Hooks + localStorage
- **Routing:** React Router DOM

## 📱 Responsive Design

The dashboard is fully responsive and works seamlessly across:
- **Desktop:** Full-featured layout with multi-column grids
- **Tablet:** Optimized layout with adjusted spacing
- **Mobile:** Stack-based layout with touch-friendly interactions

## 🎨 Design System

### Color Palette
- **Primary:** Indigo to Purple gradient (`from-indigo-600 to-purple-600`)
- **Background:** Light blue gradient (`from-blue-50 to-indigo-100`)
- **Cards:** White with transparency and backdrop blur
- **Text:** Professional gray scale

### Typography
- **Headers:** Bold, gradient text for emphasis
- **Body:** Clean, readable font sizes with proper contrast
- **Labels:** Consistent sizing and spacing

## 💾 Data Storage

Currently, the application uses localStorage for data persistence:
- **Hotels:** Stored as JSON array in `localStorage.hotels`
- **Menus:** Stored as JSON array in `localStorage.menus`
- **Authentication:** Session stored in `localStorage.hotel_admin_auth`

### Data Models

#### Hotel
```typescript
interface Hotel {
  id: string;
  name: string;
  location: string;
  description: string;
  createdAt: Date;
}
```

#### Menu Structure
```typescript
interface MenuItem {
  id: string;
  name: string;
  description: string;
  price: number;
  image?: string;
}

interface MenuCategory {
  id: string;
  name: string;
  items: MenuItem[];
}

interface HotelMenu {
  id: string;
  hotelId: string;
  categories: MenuCategory[];
}
```

## 🚀 Deployment

### Local Development
```bash
npm run dev
```

### Production Build
```bash
npm run build
npm run preview
```

### Deploy to Vercel
1. Push your code to GitHub
2. Connect your repository to Vercel
3. Deploy with automatic builds

### Deploy to Render
1. Create a new Static Site on Render
2. Connect your repository
3. Set build command: `npm run build`
4. Set publish directory: `dist`

## 🔧 Customization

### Adding New Menu Categories
The system supports any number of menu categories. Common examples:
- Starters / Appetizers
- Soups & Salads
- Main Course
- Beverages
- Desserts
- Specials

### Extending Hotel Properties
To add more hotel fields, update the `Hotel` interface in `Dashboard.tsx` and modify the hotel forms accordingly.

### Custom Styling
The design system is built with CSS custom properties. Modify colors in `src/index.css`:

```css
:root {
  --primary: your-primary-color;
  --secondary: your-secondary-color;
  /* ... other variables */
}
```

## 🐛 Troubleshooting

### Common Issues

1. **Build Errors:**
   - Ensure all dependencies are installed: `npm install`
   - Clear node_modules and reinstall: `rm -rf node_modules && npm install`

2. **Styling Issues:**
   - Verify Tailwind CSS is properly configured
   - Check for conflicting CSS classes

3. **Data Not Persisting:**
   - Check browser localStorage is enabled
   - Verify no browser extensions are blocking localStorage

### Browser Support
- Chrome (recommended)
- Firefox
- Safari
- Edge

## 📝 Future Enhancements

Potential improvements for production use:
- Database integration (MongoDB, PostgreSQL)
- Image upload functionality
- User role management
- Menu printing/PDF export
- Order management system
- Analytics dashboard
- Multi-language support

## 📄 License

This project is open source and available under the [MIT License](LICENSE).

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

---

**Built with ❤️ using Lovable AI Platform**
