
import { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Plus, Edit, Trash2, Menu, DollarSign, Image as ImageIcon, ChefHat } from "lucide-react";
import { Hotel, HotelMenu, MenuCategory, MenuItem } from './Dashboard';
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from "@/components/ui/alert-dialog";

interface MenuManagementProps {
  hotels: Hotel[];
  menus: HotelMenu[];
  onAddMenu: (hotelId: string) => void;
  onUpdateMenu: (menuId: string, categories: MenuCategory[]) => void;
  onDeleteMenu: (menuId: string) => void;
}

const MenuManagement = ({ hotels, menus, onAddMenu, onUpdateMenu, onDeleteMenu }: MenuManagementProps) => {
  const [selectedHotelId, setSelectedHotelId] = useState<string>('');
  const [selectedMenu, setSelectedMenu] = useState<HotelMenu | null>(null);
  const [isAddCategoryDialogOpen, setIsAddCategoryDialogOpen] = useState(false);
  const [isAddItemDialogOpen, setIsAddItemDialogOpen] = useState(false);
  const [selectedCategoryId, setSelectedCategoryId] = useState<string>('');
  const [editingCategory, setEditingCategory] = useState<MenuCategory | null>(null);
  const [editingItem, setEditingItem] = useState<MenuItem | null>(null);
  
  const [categoryFormData, setCategoryFormData] = useState({
    name: '',
  });
  
  const [itemFormData, setItemFormData] = useState({
    name: '',
    description: '',
    price: '',
    image: '',
  });

  const handleHotelSelect = (hotelId: string) => {
    setSelectedHotelId(hotelId);
    const menu = menus.find(m => m.hotelId === hotelId);
    setSelectedMenu(menu || null);
    if (!menu) {
      onAddMenu(hotelId);
    }
  };

  const handleAddCategory = (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedMenu) return;

    const newCategory: MenuCategory = {
      id: Date.now().toString(),
      name: categoryFormData.name,
      items: [],
    };

    const updatedCategories = [...selectedMenu.categories, newCategory];
    onUpdateMenu(selectedMenu.id, updatedCategories);
    
    // Update local state
    setSelectedMenu(prev => prev ? { ...prev, categories: updatedCategories } : null);
    
    setCategoryFormData({ name: '' });
    setIsAddCategoryDialogOpen(false);
  };

  const handleEditCategory = (category: MenuCategory) => {
    setEditingCategory(category);
    setCategoryFormData({ name: category.name });
  };

  const handleUpdateCategory = () => {
    if (!selectedMenu || !editingCategory) return;

    const updatedCategories = selectedMenu.categories.map(cat =>
      cat.id === editingCategory.id ? { ...cat, name: categoryFormData.name } : cat
    );

    onUpdateMenu(selectedMenu.id, updatedCategories);
    setSelectedMenu(prev => prev ? { ...prev, categories: updatedCategories } : null);
    
    setEditingCategory(null);
    setCategoryFormData({ name: '' });
  };

  const handleDeleteCategory = (categoryId: string) => {
    if (!selectedMenu) return;

    const updatedCategories = selectedMenu.categories.filter(cat => cat.id !== categoryId);
    onUpdateMenu(selectedMenu.id, updatedCategories);
    setSelectedMenu(prev => prev ? { ...prev, categories: updatedCategories } : null);
  };

  const handleAddItem = (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedMenu || !selectedCategoryId) return;

    const newItem: MenuItem = {
      id: Date.now().toString(),
      name: itemFormData.name,
      description: itemFormData.description,
      price: parseFloat(itemFormData.price),
      image: itemFormData.image || undefined,
    };

    const updatedCategories = selectedMenu.categories.map(cat =>
      cat.id === selectedCategoryId 
        ? { ...cat, items: [...cat.items, newItem] }
        : cat
    );

    onUpdateMenu(selectedMenu.id, updatedCategories);
    setSelectedMenu(prev => prev ? { ...prev, categories: updatedCategories } : null);
    
    setItemFormData({ name: '', description: '', price: '', image: '' });
    setIsAddItemDialogOpen(false);
  };

  const handleEditItem = (item: MenuItem, categoryId: string) => {
    setEditingItem(item);
    setSelectedCategoryId(categoryId);
    setItemFormData({
      name: item.name,
      description: item.description,
      price: item.price.toString(),
      image: item.image || '',
    });
  };

  const handleUpdateItem = () => {
    if (!selectedMenu || !editingItem || !selectedCategoryId) return;

    const updatedItem: MenuItem = {
      ...editingItem,
      name: itemFormData.name,
      description: itemFormData.description,
      price: parseFloat(itemFormData.price),
      image: itemFormData.image || undefined,
    };

    const updatedCategories = selectedMenu.categories.map(cat =>
      cat.id === selectedCategoryId
        ? { ...cat, items: cat.items.map(item => item.id === editingItem.id ? updatedItem : item) }
        : cat
    );

    onUpdateMenu(selectedMenu.id, updatedCategories);
    setSelectedMenu(prev => prev ? { ...prev, categories: updatedCategories } : null);
    
    setEditingItem(null);
    setItemFormData({ name: '', description: '', price: '', image: '' });
  };

  const handleDeleteItem = (itemId: string, categoryId: string) => {
    if (!selectedMenu) return;

    const updatedCategories = selectedMenu.categories.map(cat =>
      cat.id === categoryId
        ? { ...cat, items: cat.items.filter(item => item.id !== itemId) }
        : cat
    );

    onUpdateMenu(selectedMenu.id, updatedCategories);
    setSelectedMenu(prev => prev ? { ...prev, categories: updatedCategories } : null);
  };

  const selectedHotel = hotels.find(h => h.id === selectedHotelId);

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">Menu Management</h2>
          <p className="text-gray-600">Create and manage menus for your hotels</p>
        </div>
      </div>

      {hotels.length === 0 ? (
        <Card className="bg-white/80 backdrop-blur-sm border-0 shadow-lg">
          <CardContent className="flex flex-col items-center justify-center py-12">
            <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mb-4">
              <Menu className="w-8 h-8 text-gray-400" />
            </div>
            <h3 className="text-lg font-medium text-gray-900 mb-2">No hotels available</h3>
            <p className="text-gray-600 text-center">
              You need to add hotels first before creating menus.
            </p>
          </CardContent>
        </Card>
      ) : (
        <>
          {/* Hotel Selection */}
          <Card className="bg-white/80 backdrop-blur-sm border-0 shadow-lg">
            <CardHeader>
              <CardTitle>Select Hotel</CardTitle>
              <CardDescription>Choose a hotel to manage its menu</CardDescription>
            </CardHeader>
            <CardContent>
              <Select value={selectedHotelId} onValueChange={handleHotelSelect}>
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Select a hotel..." />
                </SelectTrigger>
                <SelectContent>
                  {hotels.map((hotel) => (
                    <SelectItem key={hotel.id} value={hotel.id}>
                      {hotel.name} - {hotel.location}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </CardContent>
          </Card>

          {/* Menu Management */}
          {selectedHotel && selectedMenu && (
            <Card className="bg-white/80 backdrop-blur-sm border-0 shadow-lg">
              <CardHeader>
                <div className="flex justify-between items-center">
                  <div>
                    <CardTitle className="flex items-center gap-2">
                      <ChefHat className="w-5 h-5" />
                      Menu for {selectedHotel.name}
                    </CardTitle>
                    <CardDescription>{selectedHotel.location}</CardDescription>
                  </div>
                  
                  <Dialog open={isAddCategoryDialogOpen} onOpenChange={setIsAddCategoryDialogOpen}>
                    <DialogTrigger asChild>
                      <Button className="bg-gradient-to-r from-indigo-600 to-purple-600">
                        <Plus className="w-4 h-4 mr-2" />
                        Add Category
                      </Button>
                    </DialogTrigger>
                    <DialogContent>
                      <DialogHeader>
                        <DialogTitle>Add Menu Category</DialogTitle>
                        <DialogDescription>
                          Create a new category for your menu (e.g., Starters, Main Course, Desserts)
                        </DialogDescription>
                      </DialogHeader>
                      <form onSubmit={handleAddCategory} className="space-y-4">
                        <div className="space-y-2">
                          <Label htmlFor="categoryName">Category Name</Label>
                          <Input
                            id="categoryName"
                            value={categoryFormData.name}
                            onChange={(e) => setCategoryFormData({ name: e.target.value })}
                            placeholder="e.g., Starters, Main Course, Beverages"
                            required
                          />
                        </div>
                        <div className="flex justify-end space-x-2">
                          <Button type="button" variant="outline" onClick={() => setIsAddCategoryDialogOpen(false)}>
                            Cancel
                          </Button>
                          <Button type="submit">Add Category</Button>
                        </div>
                      </form>
                    </DialogContent>
                  </Dialog>
                </div>
              </CardHeader>
              
              <CardContent className="space-y-6">
                {selectedMenu.categories.length === 0 ? (
                  <div className="text-center py-8">
                    <div className="w-12 h-12 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                      <Plus className="w-6 h-6 text-gray-400" />
                    </div>
                    <h3 className="text-lg font-medium text-gray-900 mb-2">No categories yet</h3>
                    <p className="text-gray-600 mb-4">Start by adding your first menu category.</p>
                    <Button onClick={() => setIsAddCategoryDialogOpen(true)}>
                      <Plus className="w-4 h-4 mr-2" />
                      Add First Category
                    </Button>
                  </div>
                ) : (
                  <div className="space-y-6">
                    {selectedMenu.categories.map((category) => (
                      <div key={category.id} className="border border-gray-200 rounded-lg p-4">
                        <div className="flex justify-between items-center mb-4">
                          {editingCategory?.id === category.id ? (
                            <div className="flex items-center space-x-2 flex-1">
                              <Input
                                value={categoryFormData.name}
                                onChange={(e) => setCategoryFormData({ name: e.target.value })}
                                className="max-w-xs"
                              />
                              <Button onClick={handleUpdateCategory} size="sm" className="bg-green-600">
                                Save
                              </Button>
                              <Button 
                                onClick={() => setEditingCategory(null)} 
                                size="sm" 
                                variant="outline"
                              >
                                Cancel
                              </Button>
                            </div>
                          ) : (
                            <>
                              <div>
                                <h3 className="text-lg font-semibold text-gray-900">{category.name}</h3>
                                <p className="text-sm text-gray-600">
                                  {category.items.length} {category.items.length === 1 ? 'item' : 'items'}
                                </p>
                              </div>
                              <div className="flex space-x-2">
                                <Button
                                  onClick={() => {
                                    setSelectedCategoryId(category.id);
                                    setIsAddItemDialogOpen(true);
                                  }}
                                  size="sm"
                                  variant="outline"
                                >
                                  <Plus className="w-3 h-3 mr-1" />
                                  Add Item
                                </Button>
                                <Button
                                  onClick={() => handleEditCategory(category)}
                                  size="sm"
                                  variant="outline"
                                >
                                  <Edit className="w-3 h-3" />
                                </Button>
                                <AlertDialog>
                                  <AlertDialogTrigger asChild>
                                    <Button size="sm" variant="outline" className="hover:bg-red-50">
                                      <Trash2 className="w-3 h-3" />
                                    </Button>
                                  </AlertDialogTrigger>
                                  <AlertDialogContent>
                                    <AlertDialogHeader>
                                      <AlertDialogTitle>Delete Category</AlertDialogTitle>
                                      <AlertDialogDescription>
                                        Are you sure you want to delete "{category.name}"? This will also delete all items in this category.
                                      </AlertDialogDescription>
                                    </AlertDialogHeader>
                                    <AlertDialogFooter>
                                      <AlertDialogCancel>Cancel</AlertDialogCancel>
                                      <AlertDialogAction
                                        onClick={() => handleDeleteCategory(category.id)}
                                        className="bg-red-600"
                                      >
                                        Delete
                                      </AlertDialogAction>
                                    </AlertDialogFooter>
                                  </AlertDialogContent>
                                </AlertDialog>
                              </div>
                            </>
                          )}
                        </div>
                        
                        <Separator className="my-4" />
                        
                        {category.items.length === 0 ? (
                          <div className="text-center py-6 bg-gray-50 rounded-lg">
                            <p className="text-gray-500 mb-2">No items in this category</p>
                            <Button
                              onClick={() => {
                                setSelectedCategoryId(category.id);
                                setIsAddItemDialogOpen(true);
                              }}
                              size="sm"
                              variant="outline"
                            >
                              <Plus className="w-3 h-3 mr-1" />
                              Add First Item
                            </Button>
                          </div>
                        ) : (
                          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                            {category.items.map((item) => (
                              <div key={item.id} className="border border-gray-100 rounded-lg p-3 bg-white">
                                {editingItem?.id === item.id ? (
                                  <div className="space-y-3">
                                    <Input
                                      value={itemFormData.name}
                                      onChange={(e) => setItemFormData(prev => ({ ...prev, name: e.target.value }))}
                                      placeholder="Item name"
                                      className="text-sm"
                                    />
                                    <Textarea
                                      value={itemFormData.description}
                                      onChange={(e) => setItemFormData(prev => ({ ...prev, description: e.target.value }))}
                                      placeholder="Description"
                                      rows={2}
                                      className="text-sm"
                                    />
                                    <Input
                                      type="number"
                                      step="0.01"
                                      value={itemFormData.price}
                                      onChange={(e) => setItemFormData(prev => ({ ...prev, price: e.target.value }))}
                                      placeholder="Price"
                                      className="text-sm"
                                    />
                                    <Input
                                      value={itemFormData.image}
                                      onChange={(e) => setItemFormData(prev => ({ ...prev, image: e.target.value }))}
                                      placeholder="Image URL (optional)"
                                      className="text-sm"
                                    />
                                    <div className="flex space-x-2">
                                      <Button onClick={handleUpdateItem} size="sm" className="flex-1 bg-green-600">
                                        Save
                                      </Button>
                                      <Button 
                                        onClick={() => setEditingItem(null)} 
                                        size="sm" 
                                        variant="outline"
                                        className="flex-1"
                                      >
                                        Cancel
                                      </Button>
                                    </div>
                                  </div>
                                ) : (
                                  <>
                                    {item.image && (
                                      <div className="w-full h-20 bg-gray-100 rounded mb-2 flex items-center justify-center">
                                        <ImageIcon className="w-6 h-6 text-gray-400" />
                                      </div>
                                    )}
                                    <h4 className="font-medium text-gray-900 mb-1">{item.name}</h4>
                                    <p className="text-xs text-gray-600 mb-2 line-clamp-2">
                                      {item.description}
                                    </p>
                                    <div className="flex justify-between items-center mb-2">
                                      <Badge variant="secondary" className="flex items-center">
                                        <DollarSign className="w-3 h-3 mr-1" />
                                        {item.price.toFixed(2)}
                                      </Badge>
                                    </div>
                                    <div className="flex space-x-1">
                                      <Button
                                        onClick={() => handleEditItem(item, category.id)}
                                        size="sm"
                                        variant="outline"
                                        className="flex-1 text-xs"
                                      >
                                        <Edit className="w-3 h-3" />
                                      </Button>
                                      <AlertDialog>
                                        <AlertDialogTrigger asChild>
                                          <Button
                                            size="sm"
                                            variant="outline"
                                            className="flex-1 text-xs hover:bg-red-50"
                                          >
                                            <Trash2 className="w-3 h-3" />
                                          </Button>
                                        </AlertDialogTrigger>
                                        <AlertDialogContent>
                                          <AlertDialogHeader>
                                            <AlertDialogTitle>Delete Item</AlertDialogTitle>
                                            <AlertDialogDescription>
                                              Are you sure you want to delete "{item.name}"?
                                            </AlertDialogDescription>
                                          </AlertDialogHeader>
                                          <AlertDialogFooter>
                                            <AlertDialogCancel>Cancel</AlertDialogCancel>
                                            <AlertDialogAction
                                              onClick={() => handleDeleteItem(item.id, category.id)}
                                              className="bg-red-600"
                                            >
                                              Delete
                                            </AlertDialogAction>
                                          </AlertDialogFooter>
                                        </AlertDialogContent>
                                      </AlertDialog>
                                    </div>
                                  </>
                                )}
                              </div>
                            ))}
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                )}
              </CardContent>
            </Card>
          )}

          {/* Add Item Dialog */}
          <Dialog open={isAddItemDialogOpen} onOpenChange={setIsAddItemDialogOpen}>
            <DialogContent className="sm:max-w-[500px]">
              <DialogHeader>
                <DialogTitle>Add Menu Item</DialogTitle>
                <DialogDescription>
                  Add a new item to the selected category.
                </DialogDescription>
              </DialogHeader>
              <form onSubmit={handleAddItem} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="itemName">Item Name</Label>
                  <Input
                    id="itemName"
                    value={itemFormData.name}
                    onChange={(e) => setItemFormData(prev => ({ ...prev, name: e.target.value }))}
                    placeholder="e.g., Grilled Chicken Breast"
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="itemDescription">Description</Label>
                  <Textarea
                    id="itemDescription"
                    value={itemFormData.description}
                    onChange={(e) => setItemFormData(prev => ({ ...prev, description: e.target.value }))}
                    placeholder="Describe the dish..."
                    rows={3}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="itemPrice">Price ($)</Label>
                  <Input
                    id="itemPrice"
                    type="number"
                    step="0.01"
                    value={itemFormData.price}
                    onChange={(e) => setItemFormData(prev => ({ ...prev, price: e.target.value }))}
                    placeholder="0.00"
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="itemImage">Image URL (Optional)</Label>
                  <Input
                    id="itemImage"
                    value={itemFormData.image}
                    onChange={(e) => setItemFormData(prev => ({ ...prev, image: e.target.value }))}
                    placeholder="https://example.com/image.jpg"
                  />
                </div>
                <div className="flex justify-end space-x-2 pt-4">
                  <Button type="button" variant="outline" onClick={() => setIsAddItemDialogOpen(false)}>
                    Cancel
                  </Button>
                  <Button type="submit">Add Item</Button>
                </div>
              </form>
            </DialogContent>
          </Dialog>
        </>
      )}
    </div>
  );
};

export default MenuManagement;
