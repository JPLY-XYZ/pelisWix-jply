import { FlatList, Text, View } from "react-native";
import ActorPoster from "./ActorPoster";

function ActorHorizontalList({cast, title}) {
    return ( 
    <View className="pb-5">
        <Text className="text-3xl font-bold px-4 ">{title}</Text>
        <FlatList
        
        style={{ rowGap: 10, paddingBottom: 10, marginTop: 10 }}
        horizontal = {true}
        showsHorizontalScrollIndicator={false}
        data={cast}
        keyExtractor={(item) => `${item.id}`}
        renderItem={({item}) => <ActorPoster actor={item} smallPoster  /> }
        ></FlatList>
    </View> 
    );
}

export default ActorHorizontalList;