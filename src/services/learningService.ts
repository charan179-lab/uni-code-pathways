
import { supabase } from '@/integrations/supabase/client';

export interface LearningTrack {
  id: string;
  title: string;
  description: string;
  image_url: string | null;
  level: number;
  estimated_hours: number | null;
  created_at: string;
  updated_at: string;
}

export interface TrackModule {
  id: string;
  track_id: string;
  title: string;
  description: string;
  order_index: number;
  created_at: string;
  updated_at: string;
}

export interface CodingChallenge {
  id: string;
  title: string;
  description: string;
  difficulty: 'easy' | 'medium' | 'hard' | 'expert';
  languages: string[];
  initial_code: Record<string, string>;
  hints: string[];
  created_at: string;
}

export interface UserProgress {
  track_id: string;
  progress_percentage: number;
  completed_challenges: string[];
  current_module_id: string | null;
}

// Learning tracks
export const getLearningTracks = async () => {
  const { data, error } = await supabase
    .from('learning_tracks')
    .select('*')
    .order('level', { ascending: true });
  
  if (error) {
    console.error('Error fetching learning tracks:', error);
    throw error;
  }
  
  return data as LearningTrack[];
};

export const getLearningTrackById = async (id: string) => {
  const { data, error } = await supabase
    .from('learning_tracks')
    .select('*')
    .eq('id', id)
    .single();
  
  if (error) {
    console.error(`Error fetching learning track with id ${id}:`, error);
    throw error;
  }
  
  return data as LearningTrack;
};

// Track modules
export const getModulesByTrackId = async (trackId: string) => {
  const { data, error } = await supabase
    .from('track_modules')
    .select('*')
    .eq('track_id', trackId)
    .order('order_index', { ascending: true });
  
  if (error) {
    console.error(`Error fetching modules for track ${trackId}:`, error);
    throw error;
  }
  
  return data as TrackModule[];
};

// Coding challenges
export const getChallengesByModuleId = async (moduleId: string) => {
  const { data, error } = await supabase
    .from('module_challenges')
    .select(`
      challenge_id,
      order_index,
      coding_challenges (*)
    `)
    .eq('module_id', moduleId)
    .order('order_index', { ascending: true });
  
  if (error) {
    console.error(`Error fetching challenges for module ${moduleId}:`, error);
    throw error;
  }
  
  return data.map(item => item.coding_challenges) as CodingChallenge[];
};

// User progress
export const getUserProgress = async (userId: string, trackId: string) => {
  const { data, error } = await supabase
    .from('user_progress')
    .select('*')
    .eq('user_id', userId)
    .eq('track_id', trackId)
    .single();
  
  if (error && error.code !== 'PGRST116') { // PGRST116 is "no rows returned"
    console.error(`Error fetching user progress:`, error);
    throw error;
  }
  
  return data as UserProgress | null;
};

export const createOrUpdateUserProgress = async (
  userId: string,
  trackId: string,
  progressUpdate: Partial<UserProgress>
) => {
  // First try to get existing progress
  const existingProgress = await getUserProgress(userId, trackId);
  
  if (existingProgress) {
    // Update existing progress
    const { data, error } = await supabase
      .from('user_progress')
      .update({
        ...progressUpdate,
        last_activity: new Date().toISOString()
      })
      .eq('user_id', userId)
      .eq('track_id', trackId)
      .select()
      .single();
    
    if (error) {
      console.error(`Error updating user progress:`, error);
      throw error;
    }
    
    return data as UserProgress;
  } else {
    // Create new progress record
    const { data, error } = await supabase
      .from('user_progress')
      .insert({
        user_id: userId,
        track_id: trackId,
        ...progressUpdate,
        started_at: new Date().toISOString(),
        last_activity: new Date().toISOString()
      })
      .select()
      .single();
    
    if (error) {
      console.error(`Error creating user progress:`, error);
      throw error;
    }
    
    return data as UserProgress;
  }
};
