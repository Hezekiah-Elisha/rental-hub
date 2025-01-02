/** @type {import('next').NextConfig} */
const nextConfig = {
    images:{
        remotePatterns:[
            {
                protocol: "http",
                hostname: "localhost",
                port: "7000",
                pathname: "/**"
            }
        ]
    },
    async redirects(){
        return [
            {
                source: "/dashboard",
                destination: "/dashboard/home",
                permanent: true
            }
        ];
    }
};

export default nextConfig;
