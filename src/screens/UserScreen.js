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
                <Text>Carregando usuário {}...</Text>
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
            <Text style={styles.celula}>Nome</Text>
            <Text style={styles.celula}>E-Mail</Text>
            <Text style={styles.celula}>Endereço</Text>
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
                        <Text style={styles.celula}>{item.address}</Text>
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
        backgroundColor: '#fff', // Cor de fundo neutra
        paddingHorizontal: 16,   // Espaçamento lateral
    },
    linha: {
        flexDirection: 'row',
        alignItems: 'center',
        borderBottomWidth: 1,
        borderBottomColor: '#ddd', // Um tom mais suave que #ccc
        paddingVertical: 8,
    },
    cabecalho: {
        backgroundColor: '#e6e6e6', // Um pouco mais escuro que #f2f2f2 para contraste
        borderTopLeftRadius: 4,
        borderTopRightRadius: 4,
    },
    celula: {
        flex: 1,
        paddingVertical: 12,
        paddingHorizontal: 8,
        textAlign: 'center',
        fontSize: 14,
        color: '#333', // Melhor contraste para leitura
    }
});
