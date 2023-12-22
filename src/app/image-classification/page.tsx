"use client";
import { Button, buttonVariants } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { cn } from '@/lib/utils';
import axios from 'axios';
import { ImageIcon, Loader2, ScanSearch } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import React, { useState } from 'react';

type MyComponentProps = {
    // Define your component props here
};

const ImageClassificationPage: React.FC<MyComponentProps> = () => {
    const [url, setUrl] = useState();
    const [label, setLabel] = useState();
    const [loading, setLoading] = useState<boolean>(false);
    return (
        <main className='flex flex-col items-center justify-start p-24 gap-2'>
            <form onSubmit={uploadFiles} className='flex gap-2 items-center'>
                <ImageIcon />
                <Input name='files' type='file'></Input>
                <Button disabled={loading} type='submit'>
                    {loading ? (<Loader2 className='animate-spin' />) : (<ScanSearch size={20} />)}
                </Button>
            </form>
            {url && (
                <>
                    <Image src={url} alt="uploaded image" width={300} height={300} />
                    <Link href={url} className={cn(buttonVariants({ variant: "ghost" }), "text-xs text-muted-foreground")}></Link>
                </>
            )}
            {label && <p className='text-l font-bold'>Detected: {label}</p>}
        </main>
    );

    async function uploadFiles(event: any) {
        event.preventDefault();
        const formData = new FormData(event.target);
        setLoading(true);
        const response = await axios.post('/api/image-classification', formData);
        setLoading(false);
    }
};

export default ImageClassificationPage;
