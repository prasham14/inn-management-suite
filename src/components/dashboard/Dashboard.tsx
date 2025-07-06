
import { useState, useEffect } from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { LogOut, Hotel, Menu, Plus } from "lucide-react";
import HotelManagement from './HotelManagement';
import MenuManagement from './MenuManagement';

interface DashboardProps {
  onLogout: () => void;
}

export interface Hotel {
  id: string;
  name: string;
  location: string;
  description: string;
  createdAt: Date;
}

export interface MenuItem {
  id: string;
  name: string;
  description: string;
  price: number;
  image?: string;
}

export interface MenuCategory {
  id: string;
  name: string;
  items: MenuItem[];
}

export interface HotelMenu {
  id: string;
  hotelId: string;
  categories: MenuCategory[];
}

const Dashboard = ({ onLogout }: DashboardProps) => {
  const [hotels, setHotels] = useState<Hotel[]>([]);
  const [menus, setMenus] = useState<HotelMenu[]>([]);
  const [selectedTab, setSelectedTab] = useState('hotels');

  useEffect(() => {
    // Load data from localStorage
    const savedHotels = localStorage.getItem('hotels');
    const savedMenus = localStorage.getItem('menus');
    
    if (savedHotels) {
      setHotels(JSON.parse(savedHotels));
    }
    
    if (savedMenus) {
      setMenus(JSON.parse(savedMenus));
    }
  }, []);

  useEffect(() => {
    // Save hotels to localStorage
    localStorage.setItem('hotels', JSON.stringify(hotels));
  }, [hotels]);

  useEffect(() => {
    // Save menus to localStorage
    localStorage.setItem('menus', JSON.stringify(menus));
  }, [menus]);

  const addHotel = (hotel: Omit<Hotel, 'id' | 'createdAt'>) => {
    const newHotel: Hotel = {
      ...hotel,
      id: Date.now().toString(),
      createdAt: new Date(),
    };
    setHotels(prev => [...prev, newHotel]);
  };

  const updateHotel = (id: string, hotel: Omit<Hotel, 'id' | 'createdAt'>) => {
    setHotels(prev => prev.map(h => 
      h.id === id ? { ...h, ...hotel } : h
    ));
  };

  const deleteHotel = (id: string) => {
    setHotels(prev => prev.filter(h => h.id !== id));
    setMenus(prev => prev.filter(m => m.hotelId !== id));
  };

  const addMenu = (hotelId: string) => {
    const newMenu: HotelMenu = {
      id: Date.now().toString(),
      hotelId,
      categories: [],
    };
    setMenus(prev => [...prev, newMenu]);
  };

  const updateMenu = (menuId: string, categories: MenuCategory[]) => {
    setMenus(prev => prev.map(m => 
      m.id === menuId ? { ...m, categories } : m
    ));
  };

  const deleteMenu = (menuId: string) => {
    setMenus(prev => prev.filter(m => m.id !== menuId));
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      {/* Header */}
      <header className="bg-white/80 backdrop-blur-sm border-b border-gray-200 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center">
              <div className="w-10 h-10 bg-gradient-to-r from-indigo-600 to-purple-600 rounded-xl flex items-center justify-center mr-3">
                <Hotel className="w-6 h-6 text-white" />
              </div>
              <div>
                <h1 className="text-xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
                  Hotel Admin Dashboard
                </h1>
                <p className="text-sm text-gray-600">Manage your hotels and menus</p>
              </div>
            </div>
            
            <Button 
              onClick={onLogout}
              variant="outline" 
              size="sm"
              className="flex items-center gap-2 hover:bg-red-50 hover:border-red-200 hover:text-red-600 transition-colors"
            >
              <LogOut className="w-4 h-4" />
              Logout
            </Button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <Card className="bg-white/80 backdrop-blur-sm border-0 shadow-lg">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-gray-600">
                Total Hotels
              </CardTitle>
              <Hotel className="h-4 w-4 text-indigo-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-gray-900">{hotels.length}</div>
              <p className="text-xs text-gray-600">
                {hotels.length === 1 ? 'hotel registered' : 'hotels registered'}
              </p>
            </CardContent>
          </Card>
          
          <Card className="bg-white/80 backdrop-blur-sm border-0 shadow-lg">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-gray-600">
                Total Menus
              </CardTitle>
              <Menu className="h-4 w-4 text-purple-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-gray-900">{menus.length}</div>
              <p className="text-xs text-gray-600">
                {menus.length === 1 ? 'menu created' : 'menus created'}
              </p>
            </CardContent>
          </Card>
          
          <Card className="bg-white/80 backdrop-blur-sm border-0 shadow-lg">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-gray-600">
                Menu Items
              </CardTitle>
              <Plus className="h-4 w-4 text-green-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-gray-900">
                {menus.reduce((total, menu) => 
                  total + menu.categories.reduce((catTotal, cat) => catTotal + cat.items.length, 0), 0
                )}
              </div>
              <p className="text-xs text-gray-600">
                items across all menus
              </p>
            </CardContent>
          </Card>
        </div>

        {/* Tabs */}
        <Tabs value={selectedTab} onValueChange={setSelectedTab} className="space-y-6">
          <TabsList className="grid w-full grid-cols-2 bg-white/80 backdrop-blur-sm border-0 shadow-lg">
            <TabsTrigger value="hotels" className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-indigo-600 data-[state=active]:to-purple-600 data-[state=active]:text-white">
              Hotel Management
            </TabsTrigger>
            <TabsTrigger value="menus" className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-indigo-600 data-[state=active]:to-purple-600 data-[state=active]:text-white">
              Menu Management
            </TabsTrigger>
          </TabsList>
          
          <TabsContent value="hotels">
            <HotelManagement 
              hotels={hotels}
              onAddHotel={addHotel}
              onUpdateHotel={updateHotel}
              onDeleteHotel={deleteHotel}
            />
          </TabsContent>
          
          <TabsContent value="menus">
            <MenuManagement 
              hotels={hotels}
              menus={menus}
              onAddMenu={addMenu}
              onUpdateMenu={updateMenu}
              onDeleteMenu={deleteMenu}
            />
          </TabsContent>
        </Tabs>
      </main>
    </div>
  );
};

export default Dashboard;
