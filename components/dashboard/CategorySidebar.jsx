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

const CategorySideBar = ({ onSelectCategory, selectedCategory}) => {
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
        <div className="grid grid-rows-10 w-full gap-3">
            {categories.map((category, i) => {
                const isSelected = selectedCategory == category.title
                return (
                    <div
                        key={i}
                        onClick={() => onSelectCategory(category.title)}
                        className={`flex gap-4 items-center rounded-lg p-4 cursor-pointer transition-all duration-200 ${isSelected ? 'bg-gradient-to-r from-blue-400 to-indigo-500 shadow-md' : 'bg-gray-700 bg-opacity-40 hover:bg-gray-700'}`}
                    >
                        <category.icon className="w-5 h-5 flex-shrink-0"/>
                        <h1 className='text-base text-white'>{category.title}</h1>
                    </div>
                )
            })}
        </div>
    )
}


export default CategorySideBar;