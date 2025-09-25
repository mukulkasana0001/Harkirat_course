import { Logo } from "../icons/Logo";
import { TwitterIcon } from "../icons/TwitterIcon";
import { YoutubeIcon } from "../icons/YoutubeIcon";
import { SliderComponent } from "./SliderComopnent";

export function Sidebar() {
    return <div className="h-screen bg-white border-r w-72 fixed left-0 top-0 pl-6">
        <div className="flex text-2xl pt-8 items-center">
            <div className="pr-2 text-purple-600">
                <Logo size="md"/>
            </div>
            Revisitly
        </div>
        <div className="pt-8 pl-8 ">
            <div className="mt-2">
                <SliderComponent text="tweeter" icon={<TwitterIcon/>}></SliderComponent>
            </div>
            <div className="mt-2">
                <SliderComponent text="Youtube" icon={<YoutubeIcon />}></SliderComponent>
            </div>


        </div>
    </div>
}
