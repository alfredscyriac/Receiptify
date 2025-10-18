import {
  UtensilsCrossed,
  PlaneIcon,
  HomeIcon,
  ShoppingCartIcon,
  HeartPulseIcon,
  MusicIcon,
  GraduationCapIcon,
  BriefcaseIcon,
  SparklesIcon,
  FolderIcon,
} from 'lucide-react'
import { useState } from 'react'

const CategorySideBar = () => {
    const [selectedCategory, setSelectedCategory] = useState(0)
    const categories = [
        {
            icon: UtensilsCrossed,
            title: "Food & Dining"
        },
        {
            icon: PlaneIcon,
            title: "Travel"
        },
        {
            icon: HomeIcon,
            title: "Utilities"
        },
        {
            icon: ShoppingCartIcon,
            title: "Shopping"
        },
        {
            icon: HeartPulseIcon,
            title: "Health"
        },
        {
            icon: MusicIcon,
            title: "Entertainment"
        },
        {
            icon: GraduationCapIcon,
            title: "Education"
        },
        {
            icon: BriefcaseIcon,
            title: "Business"
        },
        {
            icon: SparklesIcon,
            title: "Personal"
        },
        {
            icon: FolderIcon,
            title: "Miscellaneous"
        }
    ]
    return (
        <div className="grid grid-rows-10 max-w-[380px] gap-3">
            {categories.map((category, i) => {
                return (
                    <div key={i} className={`flex gap-4 items-center rounded-lg p-4 cursor-pointer transition-all duration-200 ${selectedCategory == i ? `bg-gradient-to-r from-blue-400 to-indigo-500 shadow-md` : 'bg-gray-700 bg-opacity-40 hover:bg-gray-700'}`}>
                        <category.icon/>
                        <h1 className='text-base text-white'>{category.title}</h1>
                    </div>
                )
            })}


        </div>
    )
}


export default CategorySideBar;