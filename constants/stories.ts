import {
  getAskStories,
  getBestStories,
  getShowStories,
  GetStoriesEndpoint,
  getTopStories,
} from "@/api/endpoints";
import {
  AwardIcon,
  CrownIcon,
  LucideIcon,
  MessageCircleQuestionIcon,
  PresentationIcon
} from "lucide-react-native";

export type StoryType =
  | "topstories"
  | "beststories"
  | "askstories"
  | "showstories"

type StoryTypeOption = {
  label: string;
  type: StoryType;
};

export const storyTypes: StoryTypeOption[] = [
  { label: "Top Stories", type: "topstories" },
  { label: "Best Stories", type: "beststories" },
  { label: "Ask Stories", type: "askstories" },
  { label: "Show Stories", type: "showstories" },
];

export const MAP_STORY_TYPE_TO_ICON: Record<StoryType, LucideIcon> = {
  topstories: AwardIcon,
  beststories: CrownIcon,
  askstories: MessageCircleQuestionIcon,
  showstories: PresentationIcon,
};

export const MAP_STORY_TYPE_TO_STORY_ENDPOINTS: Record<
  StoryType,
  GetStoriesEndpoint
> = {
  topstories: getTopStories,
  beststories: getBestStories,
  askstories: getAskStories,
  showstories: getShowStories,
};
