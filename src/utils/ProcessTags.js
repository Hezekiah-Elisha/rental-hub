export default function ProcessTags(tags){
    return tags.split(',').map(tag => tag.trim()).filter(tag => tag);
}