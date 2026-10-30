import { NextResponse } from 'next/server';

export async function GET() {
    try {
        const body = new URLSearchParams({
            coordType: 'WGS－84',
            lat: '10.51',
            lng: '-66.89',
            zoomLevel: '4',
            showPrice: 'true',
            usePriceUnit: 'true',
        });

        const res = await fetch('https://m.voltajevzla.com/cdb-app-api/v1/app/cdb/shop/listnear', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
                'token': process.env.NEXT_PUBLIC_STATIONS_TOKEN || '',
                'agentOpenId': 'BJCD000001',
                'lang': 'es-ES',
            },
            body,
        });

        const data = await res.json();

        if (data.code !== 0 || !data.list) {
            return NextResponse.json({ success: false, message: 'Error al obtener estaciones' }, { status: 500 });
        }

        const categoryMap: Record<string, string> = {
            'Café': 'Cafetería',
            'Restaurant': 'Restaurante',
            'Shopping Centre': 'Centro Comercial',
            'Tourism': 'Hotel',
            'Clinic': 'Clínica',
            'Bar': 'Bar',
            'Entertainment': 'Entretenimiento',
            'Baking': 'Oficina',
            'Other': 'Eventos',
        };

        const stations = data.list.map((s: any) => ({
            id: s.id,
            lat: parseFloat(s.latitude),
            lng: parseFloat(s.longitude),
            name: s.shopName,
            status: 'Available',
            category: categoryMap[s.pStoreType] || s.pStoreType || 'Otros',
            dist: s.distance || '',
            freeNum: s.businessStatus === 1 ? parseInt(s.freeNum) || 0 : 0,
            totalNum: s.businessStatus === 1 ? parseInt(s.batteryNum) || 0 : 0,
            address: s.shopAddress || '',
        }));

        return NextResponse.json({ success: true, stations });
    } catch (error) {
        console.error('Error fetching stations:', error);
        return NextResponse.json({ success: false, message: 'Error interno' }, { status: 500 });
    }
}
