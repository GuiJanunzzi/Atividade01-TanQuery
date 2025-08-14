import { View,Text,StyleSheet,FlatList,ActivityIndicator, TouchableOpacity } from "react-native";
import { useQuery, useMutation, Mutation } from "@tanstack/react-query";
import { getUsers } from "../api/api";
import { SafeAreaView } from "react-native-safe-area-context";

export default function HomeScreen() {
    const {data,isLoading,isError,error,isFetching,refetch} = useQuery({
        queryKey:['users'],
        queryFn: getUsers
    })

    if(isLoading){
        return(
            <View style={styles.container}>
                <ActivityIndicator size={'large'}/>
                <Text>Carregando usuários...</Text>
            </View>
        )
    }

    if(isError){
        return(
            <View style={styles.container}>
                <Text style={{fontWeight:'bold', color:'red'}}>Erro ao cerregar usuários</Text>
                <Text>Erro: {error.message}</Text>
            </View>
        )
    }
  return (
    <SafeAreaView>
        <View style={[styles.linha, styles.cabecalho]}>
            <Text style={styles.cabecalho}>Nome</Text>
            <Text style={styles.cabecalho}>E-mail</Text>
            <Text style={styles.cabecalho}>Endereço</Text>
        </View>
        <FlatList
            data={data}
            refreshing={isFetching}
            onRefresh={refetch}
            renderItem={({item})=>(
                <TouchableOpacity style={{}}>
                    <View style={styles.linha}>
                        <Text style={styles.celula}>{item.name}</Text>
                        <Text style={styles.celula}>{item.email}</Text>
                        <Text style={styles.celula}>{item.address.street}{item.address.city}</Text> 
                    </View>
                </TouchableOpacity>
            )}
        />

        
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#fff', 
        paddingHorizontal: 16, 
        },
    linha: {
        flexDirection: 'row',
        alignItems: 'center',
        borderBottomWidth: 1,
        borderBottomColor: '#ddd', 
        paddingVertical: 8,
    },
    cabecalho: {
        flex: 1,
        textAlign: 'center',
        fontWeight: 'bold',
        backgroundColor: '#4682B4', 
        color: '#ffffff',
        borderTopLeftRadius: 4,
        borderTopRightRadius: 4,
    },
    celula: {
        flex: 1,
        paddingVertical: 12,
        paddingHorizontal: 8,
        fontWeight: 'bold',
        textAlign: 'center',
        fontSize: 14,
        color: '#000000', 
    }
});
